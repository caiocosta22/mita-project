<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import getCart from "src/helpers/getCart.js";
import axios from "axios";

const $q = useQuasar();
const router = useRouter();
const route = useRoute();

const cartId = $q.localStorage.getItem("cartIdBackend");
console.log("id do carrinho, ", cartId);

const qtdProduto = ref($q.localStorage.getItem("quantidadeCarrinho"));

const updateCartQuantity = (event) => {
  qtdProduto.value = event.detail.quantity;
};

const emitAddToCartEvent = () => {
  const addToCartEvent = new CustomEvent("addToCart", {
    detail: { quantity: $q.localStorage.getItem("quantidadeCarrinho") }
  });
  window.dispatchEvent(addToCartEvent);
};

const drawer = ref(false);
const prompt = ref(false);
const srcLogo = ref("/images/logo.png");
const corcabecalho = ref("black");
const pesquisa = ref("");

const categoriesBase = ref([
  {
    name: "VIAGENS",
    children: [
      { name: "VIAGEM 1", children: [] },
      { name: "VIAGEM 2", children: [] },
      { name: "VIAGEM 3", children: [] },
      { name: "VIAGEM 4", children: [] },
      { name: "VIAGEM 5", children: [] }
    ]
  }
]);

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const opacityThreshold = 0;

  if (scrollPosition > opacityThreshold) {
    srcLogo.value = "/images/logo.png";
    corcabecalho.value = "black";
  } else {
    srcLogo.value = "/images/logo_branco_mita.png";
    corcabecalho.value = "white";
  }
};

function sendCart () {
  if (cartId == null) {
    $q.notify({
      color: "red",
      textColor: "white",
      icon: "warning",
      message: "Nenhum carrinho encontrado, tente adicionar produtos."
    });
  } else {
    window.location.href = `https://mitaoficial.elevarone.com.br/checkout?idCart=${cartId}`;
  }
}

function MudarCores () {
  if (route.path === "/") {
    srcLogo.value = "/images/logo_branco_mita.png";
    corcabecalho.value = "white";
  } else {
    srcLogo.value = "/images/logo.png";
    corcabecalho.value = "black";
  }
}

function openLoginPage () {
  router.push("/login");
}

function openInicialPage (logo) {
  router.push("/");
}

function redirectToSearchPage () {
  if (pesquisa.value) {
    const url = "/pesquisa/" + pesquisa.value;
    router.push(url);
  }
}

async function openCategoryPage (category) {
  if (category.id) {
    const url = "/categorias/" + category.id;
    await router.push(url);
    window.location.reload();
  }
}

async function searchCategories () {
  try {
    const data = await axios.get("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/ecommerce/categoriaAutoRelacionada/getAllCategorias").then(e => e.data);
    if (data.length) {
      categoriesBase.value = data.map(row => {
        return { ...row, name: row.descricao, children: [...row.subCategoria], foto: row.fotoUrl };
      });
    }
  } catch (e) {
    console.error(e);
  }
}

async function clearCart () {
  try {
    $q.notify({
      color: "blue",
      textColor: "white",
      message: "Limpando carrinho, aguarde"
    });
    const idcarrinho = $q.localStorage.getItem("cartIdBackend");
    const response = await axios.post(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/cartService/clearCart/${idcarrinho}`);
    if (response.status === 200) {
      const quantidadeCarrinho = 0;
      $q.localStorage.set("quantidadeCarrinho", quantidadeCarrinho);
      emitAddToCartEvent();
      $q.notify({
        color: "green",
        textColor: "white",
        icon: "check",
        message: "Carrinho limpo com sucesso!"
      });
    }
  } catch (error) {
    console.log(error);
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Erro ao limpar carrinho, tente novamente."
    });
  }
}

onMounted(() => {
  if (route.path === "/") {
    window.addEventListener("scroll", handleScroll);
  }
});

onBeforeMount(async () => {
  await Promise.all([
    getCart(),
    MudarCores(),
    searchCategories()
  ]);
  window.addEventListener("addToCart", updateCartQuantity);
});

onBeforeUnmount(() => {
  if (route.path === "/") {
    window.removeEventListener("scroll", handleScroll);
  }
  window.removeEventListener("addToCart", updateCartQuantity);
});

</script>

<template lang="pug">
div.container
  q-toolbar.cabecalho
    div.flex.row.col
      q-img.cursor-pointer.logo.q-pa-md(
      :src="srcLogo"
      spinner-color="white"
      @click="openInicialPage"
      )
    div.minimenu.q-gutter-sm.q-pa-sm(
      style="flex-wrap: nowrap;"
      )
      a(@click="openLoginPage").cursor-pointer.usuario.row.q-gutter-sm
        q-icon(
        :color="corcabecalho"
        size="sm"
        name="fa-solid fa-regular fa-user"
        )
        span.col(:style = "{ color : corcabecalho }") Minha conta
      a.cursor-pointer.carrinho.row.q-gutter-sm(
        @click="sendCart"
      )
        q-icon(
          :color="corcabecalho"
          size="sm"
          name="fa-solid fa-cart-shopping"
        )
          q-badge.contador.text-black.text-bold(
            v-if="qtdProduto"
            floating
          ) {{ qtdProduto }}
        span(:style = "{ color : corcabecalho }") Meu carrinho
      q-icon.esvaziar.text-black.text-bold.cursor-pointer(
        v-if="qtdProduto"
        floating
        @click="clearCart"
      ) x
      div.botaomenu.row
        q-btn(
          flat
          @click="drawer = !drawer"
          round
          dense
          icon="menu"
          :color="corcabecalho"
        )
.multimenu
  q-drawer(
    behavior="mobile"
    v-model="drawer"
    width="200"
    bordered
    side="right"
  )
    q-scroll-area(class="fit")
      q-list
        q-item(
          clickable
          v-ripple
          @click="prompt = true"
        )
          q-item-section.textomenu BUSCA
          q-icon(
            name="search"
            size="md"
            style="padding-top:4px"
            color="black"
          )
        q-separator
        template(
          v-for="categorie in categoriesBase"
          :key="categorie.name"
        )
          q-item(
            clickable :active="categorie.name === 'Outbox'" v-ripple
            @click="openCategoryPage(categorie)"
          )
            q-item-section.textomenu {{ categorie.name }}
          q-separator
    q-dialog(
      v-model="prompt"
    )
      q-card(
        style="min-width:350px"
      )
        q-card-section.row.items-center
          div.h6 O que está buscando?
          q-space
          q-btn(
            icon="close"
            flat
            round
            dense
            v-close-popup
          )
        q-card-section.q-pt-none
          q-input(
            dense
            v-model="pesquisa"
            autofocus @keyup.enter="prompt = false"
            color="black"
            label-color="black"
            placeholder="Digite aqui"
            @keypress.enter="redirectToSearchPage()"
            type="search"
            ref="inputRef"
          )
        q-card-actions(
          align="right"
          text-black
        )
          q-btn(
            label="Cancelar"
            v-close-popup
            color="black"
            size="sm"
          )
          q-btn(
            label="Pesquisar"
            v-close-popup
            color="black"
            size="sm"
            @click="redirectToSearchPage()"
          )
</template>

<style scoped>

.container {
  display:flex;
  flex-wrap:nowrap;
  flex-direction: row;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  align-items: center;
  text-align: center;
}
.cabecalho{
  display: flex;
  flex-direction: row;
  flex-shrink: 1;
  flex-grow: 1;
  max-width: 85%;
  margin: 0 auto;
  justify-content:space-between
}
.logo{
  max-width: 133px;
  display: block;
}
.minimenu{
  display: flex;
  flex-direction: row;
}

.contador {
  background-color: white;
  right: -20px;
  top: -16px
}
.esvaziar {
  background-color: white;
  right: 90px;
  bottom: -20px;
  margin-top: 25px;
  border-radius:4px;
  padding: 1px 1px 1px 1px;
}
span{
  font-family: Catamaran;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}
.textomenu {
  font-size: 14px;
  color: black;
  font-weight: 400
}

@media screen and (min-width: 1150px) {
  .multimenu{
    display:none
  }
  .botaomenu{
    display:none
  }
}
@media screen and (max-width: 1150px) {
  .container{
    margin-top: -15px;
  }
  span{
    display:none
  }
  .carrinho{
    padding-right: 5px ;
  }
  .minimenu{
    margin-left: 30px;
  }
  .cabecalho{
    max-width: 87%;
  }
  .esvaziar{
    right: 10px;
    bottom: -20px;
    cursor:pointer
  }
}
@media screen and (max-width: 1024px) {
  .container {
    margin-top: -75px;
  }
  .cabecalho {
    height: 140px;
    padding-top: 65px;
  }
}
@media screen and (max-width: 768px) {
  .textomenu {
    font-size: 20px;
  }
}
@media screen and (max-width: 480px) {
  .textomenu {
    font-size: 18px;
  }
}
</style>
