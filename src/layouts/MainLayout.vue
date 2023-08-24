<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-header(elevated)
    Topbar
    Cabecalho
    Navbar
  router-view
  Footer

</template>

<script setup>
import Topbar from "../components/LayoutComponents/Topbaritems.vue";
import Cabecalho from "../components/LayoutComponents/Cabecalhoitems.vue";
import Navbar from "../components/LayoutComponents/Navitems.vue";
import Footer from "../components/LayoutComponents/Footeritems.vue";
</script>
