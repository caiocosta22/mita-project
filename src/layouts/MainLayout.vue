<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-header(:class="headerClass")
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
import { ref, onMounted, onBeforeUnmount } from "vue";

const headerClass = ref("transparent-bg");

const handleScroll = () => {
  headerClass.value = window.scrollY > 0 ? "white-bg" : "transparent-bg";
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.transparent-bg {
  background-color: transparent;
  /* Outros estilos para o fundo transparente */
}

.white-bg {
  background-color: white;
  /* Outros estilos para o fundo branco */
}
</style>
