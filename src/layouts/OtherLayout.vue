<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-header(elevated header)
    Topbar
    Cabecalho
    Navbar(nav)
  router-view
  Footer

  </template>

<script setup>
import Topbar from "../components/LayoutComponents/Topbaritems.vue";
import Cabecalho from "../components/LayoutComponents/Cabecalhoitems.vue";
import Navbar from "../components/LayoutComponents/Navitems.vue";
import Footer from "../components/LayoutComponents/Footeritems.vue";
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
