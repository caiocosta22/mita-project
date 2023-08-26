<script setup>
import Promocional from "../components/HomePageComponents/Promocional.vue";
import Categorias from "../components/HomePageComponents/Categorias.vue";
import Vendidos from "../components/HomePageComponents/MaisVendidos.vue";
import CadastroEmail from "../components/HomePageComponents/CadastroEmail.vue";
import Marketing from "../components/HomePageComponents/Marketing.vue";
import Banner from "../components/HomePageComponents/Banner.vue";
import Topbar from "../components/LayoutComponents/Topbaritems.vue";
import Cabecalho from "../components/LayoutComponents/Cabecalho.vue";
import Navbar from "../components/LayoutComponents/Navitems.vue";
import Footer from "../components/LayoutComponents/Footeritems.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";

const headerBackgroundColor = ref("rgba(0, 0, 0, 0)"); // Inicialmente opaco
const navBackGroundColor = ref("rgba(0,0,0,0)"); // Nav
const navTextColor = ref("rgba(255,255,255,1)");

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const opacityThreshold = 0;

  if (scrollPosition > opacityThreshold) {
    headerBackgroundColor.value = "rgba(255,255,255,1)"; // Opaco
    navBackGroundColor.value = "rgba(255,255,255,1)";
    navTextColor.value = "rgba(0,0,0,1)";
  } else {
    headerBackgroundColor.value = "rgba(0, 0, 0, 0)"; // Transparente
    navBackGroundColor.value = "rgba(0,0,0,0)";
    navTextColor.value = "rgba(255,255,255,1)";
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
  Banner.banner
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
  q-header.header(elevated :style="{ backgroundColor: headerBackgroundColor }")
    Topbar
    Cabecalho.cabecalho1(:style="{ backgroundcolor: navBackGroundColor, color: navTextColor }")
    Navbar.nav(:style="{ backgroundcolor: navBackGroundColor, color: navTextColor }")
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
  z-index: 10;
  box-shadow: none;
}
.nav {
  transition: color 0,5s;
  box-shadow: none;
}
.banner{
  z-index: 1;
  margin-top: -155px;
}
.cabecalho1{
  box-shadow: none;
  color: black;
}

</style>
