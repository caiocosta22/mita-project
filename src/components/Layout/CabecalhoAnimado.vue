<script setup>
import { ref, onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const menuList = [
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
];
const drawer = ref(false);

const srcLogo = ref("/images/logo_branco_mita.png");
const cortransicao = ref("white");
// const srcLogoBranca = ref("/images/logo_branco_mita.png");
// ? Exemplo do que deve retornar no parametro: https://cdn.quasar.dev/logo-v2/svg/logo-dark.svg

function openInicialPage (logo) {
  // const url = "https://alastrar-mita.netlify.app/#/";
  // window.location.replace(url, "_blank");
  router.push("/");
}

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const opacityThreshold = 0;

  if (scrollPosition > opacityThreshold) {
    srcLogo.value = "/images/logo.png";
    cortransicao.value = "black";
  } else {
    srcLogo.value = "/images/logo_branco_mita.png";
    cortransicao.value = "white";
  }
};

// async function searchLogo () {
//   try {
//     const logo = await axios.get("/projeto/configuracaoService/getLogoWeb").then(e => e.data);
//     if (logo.parametro) srcLogo.value = logo.parametro;
//   } catch (e) {
//     console.error(e);
//   }
// }

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// onBeforeMount(async () => {
//   await searchLogo();
// });

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
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
      :color="cortransicao"
      size="sm"
      name="fa-solid fa-regular fa-user"
      )
      span.q-ml-sm.text-bold(:style="{color:cortransicao}") Minha conta
    a.cursor-pointer.carrinho
      q-icon(
        :color="cortransicao"
        size="sm"
        name="fa-solid fa-cart-shopping"
      )
      span.q-ml-md.text-bold(:style="{color:cortransicao}") Meu carrinho
    .botaomenu
      q-btn(
      flat
      @click="drawer = !drawer"
      round
      dense
      icon="menu"
      :color="cortransicao"
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
a{
  color: black;
}
.logo{
  max-width:180px;
  max-height: 60px
}
.cabecalho
{
  max-height: 70px;
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
