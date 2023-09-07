<script setup>
import Promocional from "../components/PaginaInicial/Promocional.vue";
import Categorias from "../components/PaginaInicial/Categorias.vue";
import Vendidos from "../components/PaginaInicial/MaisVendidos.vue";
import Marketing from "../components/Layout/Marketing.vue";
import Banner from "../components/PaginaInicial/Banner.vue";
import Topbar from "../components/Layout/Topbar.vue";
import Cabecalho from "../components/Layout/Cabecalho.vue";
import Navbar from "../components/Layout/Nav.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";

const headerBackgroundColor = ref("rgba(0, 0, 0, 0)"); // Inicialmente opaco
const navBackGroundColor = ref("rgba(0,0,0,0)"); // Nav
const navTextColor = ref("rgba(255,255,255,1)");
const cabecalhoTextColor = ref("rgba(255,255,255,1)");
const multimenuTextColor = ref("rgba(0,0,0,1)");

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const opacityThreshold = 0;

  if (scrollPosition > opacityThreshold) {
    headerBackgroundColor.value = "rgba(255,255,255,1)"; // Opaco
    navBackGroundColor.value = "rgba(255,255,255,1)";
    navTextColor.value = "rgba(0,0,0,1)";
    cabecalhoTextColor.value = "rgba(0,0,0,1)";
    multimenuTextColor.value = "rgba(0,0,0,1)";
  } else {
    headerBackgroundColor.value = "rgba(0, 0, 0, 0)"; // Transparente
    navBackGroundColor.value = "rgba(0,0,0,0)";
    navTextColor.value = "rgba(255,255,255,1)";
    cabecalhoTextColor.value = "rgba(255,255,255,1)";
    multimenuTextColor.value = "rgba(0,0,0,1)";
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
q-page-container.column
  Banner.banner
  Promocional
  Categorias
  div
    p.titulo MAIS VENDIDOS
  Vendidos
  div
  Marketing
  q-header.header( :style="{ backgroundColor: headerBackgroundColor }")
    Topbar
    Cabecalho.cabecalho(:style="{ backgroundcolor: navBackGroundColor, color: multimenuTextColor }")
    Navbar.nav(
      :style="{ backgroundcolor: navBackGroundColor, color: navTextColor }"
      :dynamicStyle="{ backgroundcolor: navBackGroundColor, color: navTextColor }"
    )
</template>

<style scoped>
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
  z-index: 20;
}
.nav {
  transition: color 0.5s;
}
.banner{
  z-index: 2;
  margin-top: -165px;
  width:100%;
  display:flex;
  height: 789px
}
@media screen and (max-width: 1025px) {
  .nav{
    display: none;
  }
}
@media screen and (min-width: 1026px) {

}
</style>
