<script setup>
import Promocional from "../components/HomePageComponents/Promocional.vue";
import Categorias from "../components/HomePageComponents/Categorias.vue";
import Vendidos from "../components/HomePageComponents/MaisVendidos.vue";
import CadastroEmail from "../components/HomePageComponents/CadastroEmail.vue";
import Marketing from "../components/HomePageComponents/Marketing.vue";
import Banner from "../components/HomePageComponents/Banner.vue";
import Topbar from "../components/LayoutComponents/Topbaritems.vue";
import Cabecalho from "../components/LayoutComponents/Cabecalhoitems.vue";
import Navbar from "../components/LayoutComponents/Navitems.vue";
import Footer from "../components/LayoutComponents/Footeritems.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";

const headerBackgroundColor = ref("rgba(0, 0, 0, 0)"); // Inicialmente opaco
const navBackGroundColor = ref("rgba(0,0,0,0)"); // Nav

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const opacityThreshold = 100;

  if (scrollPosition > opacityThreshold) {
    headerBackgroundColor.value = "rgba(255,255,255,1)"; // Opaco
    navBackGroundColor.value = "rgba(255,255,255,1)";
  } else {
    headerBackgroundColor.value = "rgba(0, 0, 0, 0)"; // Transparente
    navBackGroundColor.value = "rgba(0,0,0,0)";
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template lang="pug">
q-page-container
  Banner
  Promocional
  div
    p.titulo CATEGORIAS
  Categorias
  div
    p.titulo MAIS VENDIDOS
  Vendidos
  div
  Marketing
  CadastroEmail
  Footer
  q-header(elevated header :style="{ backgroundColor: headerBackgroundColor }")
    Topbar
    Cabecalho
    Navbar(nav :style="{ backgroundcolor: navBackGroundColor }")
</template>

<style scoped>
  q-page-container{
    display: flex;
    flex-direction: column;
  }
  .titulo{
  color: #000;
  text-align: center;
  font-family: Catamaran;
  font-size: 35px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
  }
  .header{
  transition: background-color 1s;
  top:0;
  left:0;
}
.nav {
  transition: background-color 1s;
}
</style>
