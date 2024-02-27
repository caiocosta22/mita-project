<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useQuasar, LocalStorage } from "quasar";
import axios from "axios";
import getCart from "src/helpers/getCart";
import InnerImageZoom from "vue-inner-image-zoom";
import "vue-inner-image-zoom/lib/vue-inner-image-zoom.css";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";
import { Carousel, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";

const $q = useQuasar();
const token = $q.localStorage.getItem("token");
const quantidadeCarrinho = ref(LocalStorage.getItem("quantidadeCarrinho"));
let cartId = LocalStorage.getItem("cartIdBackend") || -1;
const idClient = LocalStorage.getItem("idclient") || -1;

const props = defineProps({
  product: {
    type: Object,
    required: true,
    default: () => {}
  }
});
const produto = computed(() => { return props.product; });
const miniaturaInicial = ref(produto.value.fotosServico);
const promoçãoInicial = ref(produto.value.promocao);
const preçoInicial = ref(produto.value.valor);
const preçoPromoçãoInicial = ref(produto.value.precoPromocional);
const principalImg = ref(produto.value.fotosServico[0].foto);
const variacao = ref(produto.value.variacoes);
const customcor = ref(produto.value?.customizacao?.color);
const customfamily = ref(produto.value?.customizacao?.font);
const customvowel = ref(produto.value?.customizacao?.vowelFont);
const customMarginleft = ref(produto.value?.customizacao?.marginLeft + "%");
const customMargintop = ref(produto.value?.customizacao?.marginTop + "%");
const customsize = ref(produto.value?.customizacao?.size + "px");
const settings = ref({
  itemsToShow: 3.5,
  snapAlign: "start",
  wrapAround: true
});
const breakpoints = ref({
  1150: {
    itemsToShow: 3.5,
    snapAlign: "center"
  }
});
const gutterClass = ref("");
const usarSkeleton = ref(false);
const qtdProduct = ref(1);
const cep = ref();
const itemQuantity = ref();
const dadosFrete = ref([]);
const text1 = ref("");
const selectedColor = ref(null);
const miniaturas = ref(miniaturaInicial);
const promoção = ref(promoçãoInicial);
const preço = ref(preçoInicial);
const preçoPromoção = ref(preçoPromoçãoInicial);
const nomecor = ref("");
const LoadingFrete = ref(false);
const copyLink = () => {
  navigator.clipboard.writeText(window.location.href);
  $q.notify({
    message: "Link Copiado para Área de transferência!"
  });
};
const FreteProprio = ref("");
const setGutterClass = () => {
  gutterClass.value = window.innerWidth >= 1150 ? "q-gutter-lg" : "";
};

const isVowel = char => "aeiouAEIOU".includes(char);

const formattedText = computed(() => {
  return text1.value.split("").map(char => {
    if (isVowel(char)) {
      return `<span style="font-family: ${customvowel.value};">${char}</span>`;
    } else {
      return `<span style="font-family: ${customfamily.value};">${char}</span>`;
    }
  }).join("");
});

const emitAddToCartEvent = () => {
  const addToCartEvent = new CustomEvent("addToCart", {
    detail: { quantity: LocalStorage.getItem("quantidadeCarrinho") }
  });
  window.dispatchEvent(addToCartEvent);
};

function updateProductInfo (colorId) {
  const selectedVariation = variacao.value.find(variation => variation.itemGrade1.id === colorId);
  if (selectedVariation) {
    principalImg.value = selectedVariation.fotosServico[0].foto;
    miniaturas.value = selectedVariation.fotosServico;
    nomecor.value = selectedVariation.itemGrade1.nome;
    promoção.value = selectedVariation.promocao;
    preço.value = selectedVariation.valor;
    preçoPromoção.value = selectedVariation.precoPromocional;
  }
}

function onColorClick (colorId) {
  selectedColor.value = colorId;
  updateProductInfo(colorId);
}

function formatCurrency (value) {
  const numericValue = Number(value);

  if (isNaN(numericValue)) {
    return value;
  } else if (Number.isInteger(numericValue)) {
    return numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  } else {
    return numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2
    });
  }
}

async function calcFreteProprio () {
  try {
    LoadingFrete.value = true;
    const searchCepDetails = cep.value.replace("-", "");
    const bodyreq = {
      tenant: "dev",
      freeShippingCoupon: "0",
      cep: searchCepDetails,
      products: [
        {
          codigo: produto.value.codigo,
          fotosServico: null,
          gerenciarE: produto.value.gerenciarE,
          grupo: {
            descricao: produto.value.grupo.descricao,
            id: produto.value.grupo.id
          },
          id: produto.value.id,
          porcentagemDesconto: 0,
          possuiVariacao: produto.value.possuiVariacao,
          produtoPai: null,
          promocao: produto.value.promocao,
          qtdEstoque: produto.value.qtdEstoque,
          quantidadeAgendada: produto.value.quantidadeAgendada,
          status: produto.value.status,
          valor: produto.value.valor,
          variacoes: produto.value.variacoes,
          quantity: 1,
          price: produto.value.valor
        }
      ],
      totalPrice: produto.value.valor
    };
    const dados = await axios.post("https://elevarcommerce.com.br/shipping/v1/getShippingsData", bodyreq, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    FreteProprio.value = dados.data;
    LoadingFrete.value = false;
  } catch (e) {
    console.error("Erro ao calcular frete: ", e);
  }
}

async function createCart () {
  try {
    const response = await axios.post(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/cartService/getCart/-1/${idClient}`, {
      quantity: 1,
      productId: produto.value.id
    });
    if (response.status === 200) {
      cartId = response.data.id;
      LocalStorage.set("cartIdBackend", cartId);
      await getCart();
      emitAddToCartEvent();
      $q.notify({
        color: "green",
        textColor: "white",
        icon: "check",
        message: "Carrinho criado com sucesso."
      });
    } else {
      console.log("Status da requisição, ", response.status);
      console.log("Resposta da requisição, ", response.response);
    }
  } catch (error) {
    console.log(error);
  }
}

async function verifyItem () {
  try {
    const items = LocalStorage.getItem("itemsCarrinho");
    const itemEncontrado = items.find(item => item.itemVenda.id === produto.value.id);
    itemQuantity.value = itemEncontrado.quantity;
    return !!itemEncontrado;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function addProductToCart () {
  try {
    if (cartId === -1) {
      await createCart();
    } else {
      const itemExiste = await verifyItem();
      if (!itemExiste) {
        const add = await axios.post(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/cartService/addCartItem/${cartId}`, {
          quantity: 1,
          productId: produto.value.id
        });
        if (add.status === 200) {
          await getCart();
          emitAddToCartEvent();
          $q.notify({
            color: "green",
            textColor: "white",
            icon: "check",
            message: "Item adicionado com sucesso."
          });
          console.log("Resposta da requisicao sucedida, ", add.response);
        } else {
          console.log("Status da requisicao, ", add.status);
          console.log("Resposta da requisicao, ", add.response);
          $q.notify({
            color: "red",
            textColor: "white",
            icon: "warning",
            message: "Erro ao adicionar item. tente recarregar a página"
          });
        }
      } else {
        const add = await axios.post(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/cartService/addCartItem/${cartId}`, {
          productId: produto.value.id,
          quantity: (itemQuantity.value + 1)
        });
        $q.notify({
          color: "green",
          textColor: "white",
          icon: "check",
          message: "Item já no carrinho, adicionando mais 1 unidade."
        });
        if (add.status === 200) {
          await getCart();
          emitAddToCartEvent();
        } else {
          $q.notify({
            color: "green",
            textColor: "white",
            icon: "check",
            message: "Falha ao atualizar item. Tente recarregar a página"
          });
          console.log("Status da atualizacao, ", add.status);
          console.log("Resposta da atualizacao, ", add.response);
        }
      }
    }
  } catch (error) {
    console.log(error);
    await createCart();
  }
};
onMounted(() => {
  setGutterClass();
  window.addEventListener("resize", setGutterClass);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", setGutterClass);
});

</script>

<template lang="pug">
div.container.q-pt-md.q-pb-sm
  div.containerfotos(
    :class="gutterClass"
  )
    div.miniaturas
      Splide(
        :options="{ direction: 'ttb', slidesPerView: 1, arrows: false,  height  : '690px', perPage: 3.2, breakpoints: { 1738: { perPage: 3.2, height : '600px' }, 1500: { perPage: 3.2, height : '500px' }, 1344: { perPage: 3.2, height : '437px' } }}"
      )
        SplideSlide(
          v-for="objfoto in miniaturas"
          :key="objfoto"
        )
          q-img.foto.cursor-pointer(
            @click="principalImg = objfoto.foto"
            :src="objfoto.foto"
          )
    template(
      v-if="!produto.customizacao"
    )
      div.fotogrande
        InnerImageZoom.imagezoom(
          zoomType="hover"
          v-if="principalImg"
          :src="principalImg"
          :srcSet="principalImg"
          :zoomSrc="principalImg"
          no-native-menu
          width=580
          height=600
          className="imagezoom"
        )
    template(
      v-if="produto.customizacao"
    )
      div.fotogrande
        q-img(
          :src="principalImg"
        )
          span.text-on-image(
            v-if="produto.customizacao"
            v-html="formattedText",
            :style="{ marginLeft: customMarginleft, marginTop: customMargintop, fontSize: customsize, color: customcor}"
          )
    div.miniaturasmobile
      Carousel(v-bind="settings" :breakpoints="breakpoints")
        Slide.flex.q-pr-sm(
          v-for="objfoto in miniaturas"
          :key="objfoto"
        )
          q-img.cursor-pointer(
            @click="principalImg = objfoto.foto"
            :src="objfoto.foto"
            style="display: block; max-width: 250px; max-height: 250px ;"
          )
  div.containerdetalhes
    template(
      v-if="produto.qtdEstoque < 1"
    )
      div.row.justify-between
        p.tituloprod {{ produto.descricao }}
        div.q-gutter-sm.q-pt-sm
          q-icon.cursor-pointer(
            color="black"
            size="sm"
            name="share"
            @click="copyLink"
          )
          q-icon.cursor-pointer(
            color="black"
            size="sm"
            name="favorite"
          )
      div.column.justify-center
        p(
          style="text-align: center; color: #c2c2c2; font-weight: 600; font-size: 38px; margin-top: 60px;"
        ) OPS!
        p(
          style="text-align:center; color: #c2c2c2; font-weight: 600; font-size: 24px; margin-top: 60px"
        ) Sentimos muito, <br> Este produto encontra-se indisponível.
    template(
      v-if="produto.qtdEstoque >= 1"
    )
      div.column
        div.row.justify-between
          span.tituloprod {{ produto.descricao }}
          div.q-gutter-sm.q-pt-sm
            q-icon.cursor-pointer(
              color="black"
              size="sm"
              name="share"
              @click="copyLink"
            )
            q-icon.cursor-pointer(
              color="black"
              size="sm"
              name="favorite"
            )
        p COD: {{ produto.codigo }}
      template(
        v-if="produto.gradePrimaria"
      )
        div.row.q-gutter-sm(
          v-if="produto.gradePrimaria.itensGrade.length > 1"
        )
          p.destaque {{ produto.gradePrimaria.nome }} : {{ nomecor }}
          template(
            v-for="(icon, index) in produto.gradePrimaria.itensGrade"
            :key="index"
          )
            div.q-pt-xs
              q-btn(
                round
                :name="icon.nome"
                size="xs"
                :style="{ backgroundColor: icon.valorVisualizacao }"
                :class="{ ativo: icon.ativo }"
                @click="nomecor = icon.nome, onColorClick(icon.id)"
              )
      div.justify-between.row.q-pb-sm.q-pt-sm
        template(
          v-if="promoçãoInicial"
        )
          div.column(style="display:flex;align-items:center")
            p
            p
            .destaque VALOR
          div.column(style="display:flex;text-align:right")
            span.text-black(style="font-size: 18px; text-decoration: line-through") {{ formatCurrency(preço) }}
            span.text-black.text-bold(style="font-size: 24px;") {{ formatCurrency(preçoPromoçãoInicial) }}
        template(
          v-else
        )
          div.column(style="display:flex;align-items:center")
            .destaque VALOR
          div.column(style="display:flex;text-align:right")
            span.text-black.text-bold(style="font-size: 24px;") {{ formatCurrency(preço) }}
      div.q-pb-sm
        q-separator(color="black")
      div.column.q-pt-sm.q-pb-md
        template(
          v-if="produto.customizacao"
        )
          .destaque(style="font-weight: bold;") ADICIONE SEU NOME NO PRODUTO
          q-input.q-pt-sm(
            outlined
            v-model="text1"
            placeholder="Digite aqui"
            color="black"
            label-color="black"
            maxlength="15"
          )
      div.calcularfrete
        span.destaque.q-pt-md.q-pr-md(style="min-width:28%;white-space: nowrap") CALCULE O FRETE
        q-input.campocep(
          v-model="cep"
          label="CEP"
          debounce="300"
          @update:model-value="calcFreteProprio()"
          max-length="8"
          mask="#####-###"
          color="black"
          style="width: 70%;"
        )
          template(
            v-slot:append
          )
            q-icon(
              name="search"
            )
      div.q-pt-sm
        a.cep(href="https://buscacepinter.correios.com.br/app/endereco/index.php?t") NÃO SEI MEU CEP
      template(
        v-if="!LoadingFrete"
      )
        q-btn.q-my-sm(
          v-for="frete in FreteProprio"
          style="width: 100%; vertical-align: baseline;"
          :key="frete"
          outlined
        )
          p.q-ma-none {{ frete.description }}
          p.q-my-none.q-px-md receba em até {{ frete.deadline }} {{ frete.deadline === 1 ? "dia útil" : "dias úteis"  }}
          p.q-ma-none.text-bold {{ formatCurrency(frete.price) }}
      template(
        v-if="LoadingFrete"
      )
        q-skeleton.q-my-sm(
          v-for="index in 1"
          style="width: 100%; vertical-align: baseline; text-align: center; align-items: center;"
          :key="index"
        )
         span CALCULANDO FRETE
      q-btn.botao.q-pa-md.q-mt-md.text-bold(
        color="green"
        @click="addProductToCart()"
        label="C O M P R A R"
      )
.row.col
  p.col-1
  h5.q-pt-xl.col-5(style="font-weight: bold;") DETALHES DO PRODUTO
.row.justify-start.q-pb-lg.col
  p.col-1
  p.detalhes.q-pt-sm.col-9(v-html="produto.descricaoLonga")
</template>

<style scoped>
.container{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
  justify-content: center;
  position: relative;
  width: 100%;
}
.containerfotos{
  display: flex;
  flex-wrap: nowrap;
  width:44%;
}
.miniaturas{
  width: 32.5%;
  max-height: 690px;
  position: relative;
  flex-direction: column;
}
.fotogrande {
  width: 67.5%;
  padding-right: 30px;
  position: relative;
  display: inline-block;
}
.foto {
  max-width: 210px;
  max-height: 210px;
  display:block;
  margin-bottom:10px;
}
.containerdetalhes{
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  width: 40.5%
}
.informacoesprod{
  display:flex;
  width: 22%;
}
.calcularfrete{
  display:flex;
  flex-direction: row;
  text-align: left;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}
.text-on-image {
  position: absolute;
  z-index: 1;
  box-shadow:none;
  user-select: none;
  cursor: default;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}
.cep{
  color: #939598;
  font-family: Catamaran;
  font-size: 14px;
  font-weight: 300;
  text-decoration-line: underline;;
}
.detalhesprod{
  color: #939598;
  font-family: Catamaran;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}

p.detalhes{
  color: #000;
  font-family: Catamaran;
  font-size: 18px;
  font-style: normal;
}
.tituloprod{
  color: #000;
  font-family: Catamaran;
  font-size: 28px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
}
.destaque{
  color: #000;
  font-family: Catamaran;
  font-size: 20px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
}
.ativo {
  border: solid black 2px;
}
.imagezoom {
  position:relative;
}

@media screen and (max-width: 1738px) {
  .foto {
    max-width: 180px;
    max-height: 180px;
  }
}
@media screen and (max-width: 1500px) {
  .foto {
    max-width: 150px;
    max-height: 150px;
  }
}
@media screen and (max-width: 1344px) {
  .foto {
    max-width: 130px;
    max-height: 130px;
  }
}
@media screen and (max-width: 1150px) {
  .container {
    flex-wrap: wrap;
    flex-direction: column;
  }
  .containerfotos {
    width: 84%;
    margin: auto;
    justify-content: center;
    flex-direction: column;
  }
  .containerdetalhes {
    width: 84%;
    justify-content: center;
    margin: 0 auto;
  }
  .miniaturas {
    display: none
  }
  .fotogrande{
    width: 100%;
    margin: 0 auto;
    margin-bottom: 10px;
    justify-content: center;
  }
  .miniaturasmobile{
    margin-bottom: 10px;
    margin-right: 15px;
  }
}
@media screen and (min-width: 1150px) {
  .miniaturasmobile {
    display: none;
  }
}
</style>
