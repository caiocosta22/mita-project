<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-header(elevated header :style="{ backgroundColor: headerBackgroundColor }")
    Topbar
    Cabecalho
    Navbar(nav :style="{ backgroundcolor: navBackGroundColor }")
  router-view
  Footer

  </template>

<script setup>
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

<style scoped>
.header{
  transition: background-color 0.3s;
  position: relative;
  top:0;
  left:0;
  z-index:999
}
.nav {
  transition: background-color 0.3s;
}
</style>
