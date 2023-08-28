<script setup>
import { onMounted, ref, computed, inject } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";
const $q = useQuasar();
const userInfo = $q.localStorage.getItem("userInfo");
// const configsGlobais = $q.sessionStorage.getItem("configsGlobais");
const configsGlobais = inject("configsGlobais");
const carrinho = ref("Nenhum carrinho válido encontrado");
const logoTipo = ref("");

const quantidadeCarrinho = computed(() => {
  let quantidade = 0;
  if (carrinho.value !== "Nenhum carrinho válido encontrado") {
    carrinho.value.items.forEach(item => {
      quantidade += item.quantity;
    });
  }
  return quantidade;
});

async function cadastrarLogin (fakeEmail, fakeCell, fakeSenha) {
  const url = "https://elevar.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/clienteService/salvaEcommerce";
  const headers = {
    host: "elevar.elevarloja.com.br",
    Accept: "application/json, text/plain, */*",
    "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
    "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "Content-Type": "application/json",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "Linux"
  };
  const data = {
    idFacebook: "",
    idGoogle: "",
    foto: "",
    nmCliente: "Teste",
    sobrenome: "Junior",
    login: "teste.junior",
    dsEmail: fakeEmail,
    nrCpfCnpj: "01200009923",
    nrTelefone: fakeCell,
    celular: fakeCell,
    senha: fakeSenha,
    ieIsento: false,
    tipo: "",
    dataNascimento: "01/01/1991",
    nmRazao: "",
    nomeFantasia: "",
    nrIe: "",
    cnpj: "",
    cnaePrincipal: "",
    dataAberturaEmpresa: "",
    anexos: [],
    acceptedTerms: false
  };
  try {
    await axios.post(url, data, { headers });
  } catch (error) {
    console.error("Erro ao cadastrar usuario: ", error);
  }
}
async function login (fakeEmail, fakeSenha) {
  try {
    const userInfo = await axios.post("/api/clienteService/getAutenticacaoEcommerce", {
      login: fakeEmail,
      senha: fakeSenha
    });
    $q.localStorage.set("userInfo", userInfo);
  } catch (e) {
    console.error("Erro ao fazer login: ", e.message);
  }
}
async function montarCarrinho () {
  try {
    userInfo.carrinhoValido = userInfo.carrinhoValido || "0";
    carrinho.value = await axios.post(`/api/cartService/getCart/${userInfo.carrinhoValido}/${userInfo.idCliente}`, {
      productId: 1,
      quantity: 5
    });
    userInfo.carrinhoValido = carrinho.value.id;
  } catch (e) {
    if (!e.response.data === "Nenhum carrinho válido encontrado") console.error("Erro ao buscar carrinho: ", e);
  }
}
async function adicionarItemCarrinho (item, itemQtd) {
  try {
    let id = 1;
    if (carrinho.value !== "Nenhum carrinho válido encontrado") id = userInfo.carrinhoValido;
    carrinho.value = await axios.post(`/api/cartService/addCartItem/${id}`, {
      productId: item,
      quantity: itemQtd
    });
  } catch (e) {
    console.error("Erro ao adicionar ao carrinho: ", e);
  }
}
async function carregarLogo () {
  try {
    logoTipo.value = configsGlobais.find(config => config.chave === "LOGO_WEB_SERVICE")?.parametro;
  } catch (e) {
    console.error("Erro ao buscar logo: ", e);
  }
}
async function carregarInformacoesUsuario () {
  console.log("Falta implementar");
}
async function abrirInformacoesCarrinho () {
  console.log("Falta implementar");
}
onMounted(async () => {
  // await cadastrarLogin("teste@teste.com", "(12)1345-1234", "12345");
  if (!$q.localStorage.set("userInfo", userInfo)) {
    await login("teste@teste.com", "12345");
  }
  await carregarLogo();
  await montarCarrinho();
  // await adicionarItemCarrinho(19, 12);
});
</script>
<template lang = "pug">
q-toolbar.q-pa-md.row.justify-between.q-gutter-xl
  div.col-2.q-pl-xl(
    v-if="!logoTipo"
  )
  img.cursor-pointer.col-2.q-pl-xl(
    v-else
    :src="logoTipo"
    style="width:180px;height:49px"
  )
  div.row
    div.q-mr-xl.cursor-pointer(
      @click="carregarInformacoesUsuario"
    )
      q-icon(
        color="black"
        size="sm"
        name="fa-solid fa-regular fa-user"
      )
      a.q-ml-sm.text-bold Minha conta
    div.cursor-pointer(
      @click="abrirInformacoesCarrinho"
    )
      q-icon(
        color="black"
        size="sm"
        name="fa-solid fa-cart-shopping"
      )
        q-badge.text-black.text-bold(
          v-if="quantidadeCarrinho"
          floating
        ) {{ quantidadeCarrinho }}
      a.q-ml-md.text-bold Meu carrinho
</template>
<style scoped>
.q-icon .q-badge {
  background-color: white;
  right: -20px;
  top: -15px
}
a{
  color: black
}
</style>
