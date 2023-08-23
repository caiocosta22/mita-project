<script setup>
import Banner from "../components/HomePageComponents/Banner.vue";
import Promocional from "../components/HomePageComponents/Promocional.vue";
import Categorias from "../components/HomePageComponents/Categorias.vue";
import Vendidos from "../components/HomePageComponents/MaisVendidos.vue";
import CadastroEmail from "../components/HomePageComponents/CadastroEmail.vue";
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
  CadastroEmail

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
</style>
