<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

const $q = useQuasar();
const api = "https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal";
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
    const response = await axios.post(`${api}/cartService/getCart/-1/-1`, {
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
      response = await axios.post(`${api}/cartService/addCartItem/${cartId}`, {
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
div.row.q-gutter-md.justify-center
  div.column.q-gutter-lg.q-pa-md
    template(
      v-for="objFoto in produto.fotosServico"
      :key="objFoto"
    )
      img.min(
        @click="principalImg = objFoto.foto"
        v-if="objFoto.foto"
        :src="objFoto.foto"
      )
  div
    q-img(
      v-if="principalImg"
      :src="principalImg"
      style="width:545px;height:641.935px;box-shadow:none"
      no-native-menu
    )
      .text-on-image {{ text1 }}
  div.column.q-pa-sm
    p.tituloprod {{ produto.descricao }}
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
    div.column
      p.destaque Adicione seu nome no produto!
      q-input(
        v-model="text1"
        outlined
        placeholder="Digite aqui"
        color="black"
        label-color="black"
        maxlength="15"
      )
    div.justify-between.row
      template(
        v-if="produto.promocao"
      )
        .destaque.justify-end valordesconto
      .destaque.q-pt-md.q-pb-md VALOR
      .destaque {{ produto.valor }}
    q-separator(color="black")
    div.row
      p.destaque(style="padding-top: 20px;") CALCULAR FRETE
      q-input.q-ml-md(
        v-model="cep"
        label="CEP"
        debounce="300"
        @update:model-value="calcFrete()"
        max-length="8"
        mask="#####-###"
        color="black"
        style="width: 340px;"
      )
        template(v-slot:append)
          q-icon(name="search")
    a.cep.q-pb-md(href="https://buscacepinter.correios.com.br/app/endereco/index.php?t") NÃO SEI MEU CEP
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
      style="width: 516px; height:52px"
    )
.col-10.row
  p.col-1
  h5.col-5(style="font-weight: bold;") DETALHES DO PRODUTO
.col-10.row.justify-start
  p.detalhes.col-9 {{ produto.descricaoLonga }}
  p.col-1
</template>

<style scoped>
.min{
  max-width:150px;
  max-height:200px;
}
p.detalhes{
  color: #000;
  font-family: Catamaran;
  font-size: 18px;
  font-style: normal;
  line-height: normal;
  margin: auto;
}
.foto{
  max-width:545px;
  max-height:641.935px;
  box-shadow:none
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
  align-items: center;
  display: flex;
}
.cep{
  color: #939598;
  max-width: 20%;
  font-family: Catamaran;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-decoration-line: underline;
  padding-top:10px
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
  background-color: rgba(0,0,0,0);
}
.ativo {
  border: solid black 2px;
}
</style>
