<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useQuasar } from "quasar";
import axios from "axios";

const $q = useQuasar();
const cartId = $q.localStorage.getItem("cartIdBackend");
const router = useRouter();
const route = useRoute();
const srcLogo = ref("/images/logo.png");
const corcabecalho = ref("black");

const menuList = ref([
  {
    icon: "search",
    label: "Pesquisar",
    separator: true
  },
  {
    label: "Viagens",
    separator: true
  },
  {
    label: "Necessaires",
    separator: true
  },
  {
    label: "Carteiras",
    separator: true
  },
  {
    label: "Home",
    separator: true
  },
  {
    label: "Office",
    separator: true
  },
  {
    label: "Masculino",
    separator: true
  },
  {
    label: "Feminino",
    separator: true
  },
  {
    label: "Utilitários",
    separator: true
  },
  {
    label: "Pacco",
    separator: true
  },
  {
    label: "Bolsas",
    separator: true
  }
]);
const drawer = ref(false);
const quantidadeCarrinho = ref(0);
const cartItems = ref([]);

function MudarCores () {
  if (route.path === "/") {
    srcLogo.value = "/images/logo_branco_mita.png";
    corcabecalho.value = "white";
  } else {
    srcLogo.value = "/images/logo.png";
    corcabecalho.value = "black";
  }
}

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

function openInicialPage (logo) {
  // const url = "https://alastrar-mita.netlify.app/#/";
  // window.location.replace(url, "_blank");
  router.push("/");
}

// ? Exemplo do que deve retornar no parametro: https://cdn.quasar.dev/logo-v2/svg/logo-dark.svg

// async function searchLogo () {
//   try {
//     const logo = await axios.get("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/configuracaoService/getLogoWeb").then(e => e.data);
//     if (logo.parametro) srcLogo.value = logo.parametro;
//   } catch (e) {
//     console.error(e);
//   }
// }

async function getCartItems () {
  try {
    if (cartId) {
      const cart = await axios.post(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/cartService/getCart/${cartId}/-1`);
      cartItems.value = cart.data || cart.response.data;
      if (cartItems.value !== "Nenhum carrinho válido encontrado") {
        quantidadeCarrinho.value = cartItems.value.items?.length;
      }
    }
  } catch (e) {
    console.error(e);
  }
}

setInterval(async () => {
  await getCartItems();
}, 10000);

onBeforeMount(async () => {
  await Promise.all([
    getCartItems(),
    MudarCores()
  ]);
});

onMounted(() => {
  if (route.path === "/") {
    window.addEventListener("scroll", handleScroll);
  }
});

onBeforeUnmount(() => {
  if (route.path === "/") {
    window.removeEventListener("scroll", handleScroll);
  }
});

</script>

<template lang="pug">
q-toolbar.cabecalho.q-pa-md.row.justify-between.q-mx-md
  q-img.cursor-pointer.col-2.logo(
    :src="srcLogo"
    spinner-color="white"
    @click="openInicialPage"
  )
  div.row.q-mr-xl.minimenu(style="flex-wrap: nowrap;")
    a.q-mr-sm.cursor-pointer.usuario
      q-icon(
      :color="corcabecalho"
      size="sm"
      name="fa-solid fa-regular fa-user"
      )
      span.q-ml-sm.text-bold(:style = "{ color : corcabecalho }") Minha conta
    a.cursor-pointer.carrinho
      q-icon(
        :color="corcabecalho"
        size="sm"
        name="fa-solid fa-cart-shopping"
      )
        q-badge.text-black.text-bold(
          v-if="quantidadeCarrinho"
          floating
        ) {{ quantidadeCarrinho }}
      span.q-ml-md.text-bold(:style = "{ color : corcabecalho }") Meu carrinho
    .botaomenu
      q-btn(
      flat
      @click="drawer = !drawer"
      round
      dense
      icon="menu"
      color="black"
      )
.multimenu
  q-drawer(
    behavior="mobile"
    v-model="drawer"
    :width="200"
    :breakpoint="1025"
    bordered
    side="right"
  )
    q-scroll-area(class="fit")
      q-list
        template(v-for="(menuItem, index) in menuList" :key="index")
          q-item.text-bold(
            clickable :active="menuItem.label === 'Outbox'" v-ripple
            style="color:black; font-size:bold"
          )
            q-item-section(avatar)
              q-icon(:name="menuItem.icon")
            q-item-section {{ menuItem.label }}
          q-separator(:key="'sep' + index"  v-if="menuItem.separator")
</template>

<style scoped>
a {
  color: black;
}
.logo {
  max-width:180px;
  max-height: 60px
}
.cabecalho {
  max-height: 70px;
}

.q-icon .q-badge {
  background-color: white;
  right: -20px;
  top: -15px
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
  .logo{
    max-width: 90px;
    max-height: 30px
  }
  span{
    display:none
  }
  .carrinho{
    padding-right: 5px ;
  }
}
</style>
