<script setup>
import Promocional from "../components/PaginaInicial/Promocional.vue";
import Categorias from "../components/PaginaInicial/Categorias.vue";
import Vendidos from "../components/PaginaInicial/MaisVendidos.vue";
import Banner from "../components/PaginaInicial/Banner.vue";
import Marketing from "../components/Layout/Marketing.vue";
import Topbar from "../components/Layout/Topbar.vue";
import Cabecalho from "../components/Layout/Cabecalho.vue";
import Navbar from "../components/Layout/Nav.vue";
import { useQuasar } from "quasar";
import { ref, onMounted, onBeforeUnmount } from "vue";

const headerBackgroundColor = ref("rgba(0, 0, 0, 0)"); // Inicialmente opaco
const navBackGroundColor = ref("rgba(0,0,0,0)"); // Nav
const navTextColor = ref("rgba(255,255,255,1)");
const cabecalhoTextColor = ref("rgba(255,255,255,1)");
const multimenuTextColor = ref("rgba(0,0,0,1)");
const $q = useQuasar();
const loginSalvo = $q.localStorage.getItem("login");
const senhaSalva = $q.localStorage.getItem("senha");
const nomeSalvo = $q.localStorage.getItem("nome");

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
  if (loginSalvo && senhaSalva) {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "check",
      message: `Bem vindo, ${nomeSalvo}`
    });
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template lang="pug">
q-page-container.column
  Banner
  Promocional
  Categorias
  Vendidos
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
  .header{
  transition: background-color 1s;
  z-index: 20;
}
.nav {
  transition: color 0.5s;
}
</style>
