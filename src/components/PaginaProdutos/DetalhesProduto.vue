<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

const $q = useQuasar();

const text1 = ref(""); // Referência para o texto digitado no q-input
const cep = ref(); // Ref para o texto digitado no CEP
const dadosFrete = ref([]);
const usarSkeleton = ref(false);
const quantidadeCarrinho = ref(0);
const qtdProduct = ref(1);
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

// const icons = computed(() => { return props.cores; });
const produto = computed(() => { return props.product; });
const principalImg = ref(produto.value.fotosServico[0].foto);

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href);
  $q.notify({
    message: "Link Copiado para Área de transferência!"
  });
};
function ativar (cor) {
  console.log("Quando a api tiver cor a gnt arruma");
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
console.log(props);
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
  } catch (e) {
    console.error(e);
  }
}

</script>

<template lang="pug">
div.row.justify-center.col.q-gutter-md
  div.q-pa-md.miniaturas
    template(
      v-for="objFoto in produto.fotosServico"
      :key="objFoto"
    )
      q-img(
        @click="principalImg = objFoto.foto"
        v-if="objFoto.foto"
        :src="objFoto.foto"
        style="width: 200px;height: 200px; border-radius: 4px;border-radius: 4px"
      )
  div.row.q-pa-md.fotogrande.q-pr-lg
    q-img(
      v-if="principalImg"
      :src="principalImg"
      no-native-menu
      style="width: 545px; height: 645px;border-radius: 4px;border-top-right-radius: 4px"
    )
      .text-on-image {{ text1 }}
  div.column.q-pa-sm.informacoesprod
    div
      div.row.justify-between
        span.tituloprod {{ produto.descricao }}
        div.q-gutter-sm
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
    //- Só vai dar pra fazer quando tiver um produto com cores ativa
    div.row.q-gutter-sm(
      v-if="produto.cores.length > 1"
    )
      p.destaque COR
      template(
        v-for="(icon, index) in produto.cores"
        :key="index"
      )
        div
          q-btn(
            round
            size="sm"
            :color="icon.icon"
            :class="{ ativo: icon.ativo }"
            @click="ativar(produto.cores)"
          )
    div.justify-between.row.q-pb-sm.q-pt-sm
      .destaque VALOR
      .destaque R$ {{ produto.valor }}
      template(
        v-if="produto.promocao"
      )
        .destaque.justify-end valordesconto
    div.q-pb-sm
      q-separator(color="black")
    div.column.q-pt-sm.q-pb-md
      .destaque(style="font-weight: bold;") Adicione seu nome no produto!
      q-input.q-pt-sm(
        outlined
        v-model="text1"
        placeholder="Digite aqui"
        color="black"
        label-color="black"
        maxlength="15"
      )
    div.row
      span.destaque.q-pt-md.q-pr-md CALCULAR FRETE
      q-input(
        v-model="cep"
        label="CEP"
        debounce="300"
        @update:model-value="calcFrete()"
        max-length="8"
        mask="#####-###"
        color="black"
        style="width: 380px;"
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
        p.q-ma-none.text-bold R$ {{ frete.valor }}
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
  p.detalhes.q-pt-sm.col-9 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem IpsumLorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
</template>

<style scoped>
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
  display: flex;
}
.informacoesprod{
  display:flex;
  width: 30%;
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
.text-on-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1; /* Garanta que ele esteja acima da imagem */
  font-size: 20px; /* Ajuste o tamanho da fonte conforme necessário */
  box-shadow:none;
  color: black;
  font-weight: bolderc;
  background-color: rgba(0,0,0,0);
}
.ativo {
  border: solid black 2px;
}
</style>
