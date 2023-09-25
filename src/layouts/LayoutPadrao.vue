<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-header( header)
    Topbar
    Cabecalho
    Navbar(:style="{ color: navTextColor }")
  router-view
  CadastroEmail
  Rodape

  </template>

<script setup>
import Topbar from "../components/Layout/Topbar.vue";
import Cabecalho from "../components/Layout/Cabecalho.vue";
import Navbar from "../components/Layout/Nav.vue";
import Rodape from "../components/Layout/Rodape.vue";
import CadastroEmail from "../components//Layout/CadastroEmail.vue";
import { ref } from "vue";
const navTextColor = ref("rgba(0,0,0,1)");
</script>

<style scoped>
</style>
