<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";
import getCartItems from "../../helpers/getCartItems.js";
import InnerImageZoom from "vue-inner-image-zoom";
import "vue-inner-image-zoom/lib/vue-inner-image-zoom.css";
import { Splide, SplideSlide } from "@splidejs/vue-splide";
import "@splidejs/vue-splide/css";

const $q = useQuasar();
const cartId = $q.localStorage.getItem("cartIdBackend");

const props = defineProps({
  product: {
    type: Object,
    required: true,
    // ! Dentro desse objeto monte um exemplo de como receberá o produto
    // ? Produto dever possuir a KEY id, se preferir pode transformar
    // * Dicas: Nessa tela não vai ser preciso se utilizar de v-for
    // * Se quiser ver como vem um produto é só dar console.log()
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

const usarSkeleton = ref(false);
const quantidadeCarrinho = ref(0);
const qtdProduct = ref(1);
const cep = ref();
const dadosFrete = ref([]);
const text1 = ref("");
const selectedColor = ref(null);
const miniaturas = ref(miniaturaInicial);
const promoção = ref(promoçãoInicial);
const preço = ref(preçoInicial);
const preçoPromoção = ref(preçoPromoçãoInicial);
const nomecor = ref("");

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href);
  $q.notify({
    message: "Link Copiado para Área de transferência!"
  });
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
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  });
}

async function calcFrete () {
  try {
    const searchCepDetails = cep.value.replace("-", "");
    if (searchCepDetails.length === 8) {
      const dados = await axios.get(`https://viacep.com.br/ws/${searchCepDetails}/json/`).then(e => e.data);
      await getFretes(dados);
    }
  } catch (e) {
    console.error("Erro ao calcular frete: ", e);
  }
}

async function getFretes (dados) {
  try {
    usarSkeleton.value = true;
    const json = {
      valorTotal: null,
      produtos: [
        {
          altura: 2,
          largura: 2,
          comprimento: 2,
          peso: 2,
          quantity: 1,
          price: 161.42,
          cepOrigem: "60425813",
          cepDestino: dados.cep.replace("-", "")
        }
      ],
      cliente: {
        uf: dados.uf,
        cidade: dados.localidade,
        tenant: process.env.TENANT
      }
    };
    dadosFrete.value = await axios.post("https://elevarcommerce.com.br/freteapi/frete/calcularFretePequenos", json, {
      headers: {
        // Overwrite Axios's automatically set Content-Type
        "Content-Type": "application/json"
      }
    }).then(e => e.data);
    usarSkeleton.value = false;
  } catch (e) {
    console.error(e);
  }
}

async function createCart () {
  try {
    const response = await axios.post("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/cartService/getCart/-1/-1", {
      quantity: qtdProduct.value,
      productId: produto.value.id
    }).then(e => e.data);
    $q.localStorage.set("cartIdBackend", response.id);
    return response;
  } catch (e) {
    console.error(e);
  }
}

async function addProductToCart () {
  try {
    let response = [];
    if (!cartId) {
      response = await createCart();
    } else {
      response = await axios.post(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/cartService/addCartItem/${cartId}`, {
        quantity: qtdProduct.value,
        productId: produto.value.id
      }).then(e => e.data);
    }
    if (response.length) {
      quantidadeCarrinho.value = response.items?.length;
    }
    // ! Esse ponto está na documentação, mas nada foi falado ainda sobre para onde redirecionar
    // const url = "a que eles definirem";
    // window.location.href = url;
    await getCartItems();
  } catch (e) {
    console.error(e);
  }
}

</script>

<template lang="pug">
div.container.q-pt-md.q-pb-sm
  div.containerfotos.q-gutter-lg
    div.miniaturas
      Splide(
        :options="{ direction: 'ttb', slidesPerView: 1, arrows: false,  height  : '690px', perPage: 3.2,  type   : 'loop', breakpoints: { 1738: { perPage: 3.2, height : '600px' }, 1500: { perPage: 3.2, height : '500px' }, }}"
      )
        SplideSlide(
          v-for="objfoto in miniaturas"
          :key="objfoto"
        )
          q-img.foto.cursor-pointer(
            @click="principalImg = objfoto.foto"
            :src="objfoto.foto"
            style="max-width: 180; max-height: 180; display:block"
          )
    div.fotogrande
      InnerImageZoom(
        zoomType="hover"
        v-if="principalImg"
        :src="principalImg"
        :srcSet="principalImg"
        :zoomSrc="principalImg"
        no-native-menu
        width=580
        height=600
      )
      .text-on-image {{ text1 }}
  div.containerdetalhes
    div.column
      div.row.justify-between
        span.tituloprod {{ produto.descricao }}
        div.q-gutter-sm.q-pt-sm
          q-icon.cursor-pointer(
            :color="black"
            size="sm"
            name="share"
            @click="copyLink"
          )
          q-icon.cursor-pointer(
            :color="black"
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
        @update:model-value="calcFrete()"
        max-length="8"
        mask="#####-###"
        color="black"
        style="width: 70%;"
      )
        template(v-slot:append)
          q-icon(name="search")
    div.q-pt-sm
      a.cep(href="https://buscacepinter.correios.com.br/app/endereco/index.php?t") NÃO SEI MEU CEP
    div(
      v-if="!usarSkeleton && dadosFrete.length"
    )
      q-btn.q-my-sm(
        v-for="frete in dadosFrete"
        style="width: 100%; vertical-align: baseline;"
        :key="frete"
        outlined
      )
        p.q-ma-none {{ frete.name }}
        p.q-my-none.q-px-md receba em até {{ frete.prazoEntrega }} {{ frete.prazoEntrega === 1 ? "dia útil" : "dias úteis"  }}
        p.q-ma-none.text-bold {{ formatCurrency(frete.valor) }}
    div(
      v-if="usarSkeleton"
    )
      q-skeleton(
        v-for="index in 3"
        :key="index"
      )
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
  max-height: 640px;
  position: relative;
  flex-direction: column;
}
.fotogrande {
  width: 67.5%;
  padding-right: 30px;
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
  top: 28%;
  left: 38%;
  transform: translate(-50%, -50%);
  z-index: 1;
  font-size: 20px;
  box-shadow:none;
  color: black;
  font-weight: bolder;
  background-color: rgba(0,0,0,0);
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

@media screen and (max-width: 1150px) {
  .container{
    flex-wrap: wrap;
    flex-direction: column;
  }
  .containerfotos{
    width: 84%;
    margin: 0 auto;
  }
  .containerdetalhes{
    width: 84%;
    justify-content: center;
    margin: 0 auto;
  }
}
</style>
