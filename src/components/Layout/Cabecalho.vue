<script setup>
import { ref, onBeforeMount } from "vue";
import axios from "axios";
import MultiMenu from "./MultiMenu.vue";

const srcLogo = ref("/images/logo.png");
// ? Exemplo do que deve retornar no parametro: https://cdn.quasar.dev/logo-v2/svg/logo-dark.svg

async function searchLogo () {
  try {
    const logo = await axios.get("/api/configuracaoService/getLogoWeb").then(e => e.data);
    if (logo.parametro) srcLogo.value = logo.parametro;
  } catch (e) {
    console.error(e);
  }
}

onBeforeMount(async () => {
  await searchLogo();
});

</script>

<template lang="pug">
q-toolbar.cabecalho.q-pa-md.row.justify-between.q-mx-md
  q-img.cursor-pointer.col-2(
    :src="srcLogo"
    spinner-color="white"
    style="width:180px; height: 60px"
  )
  div.row.q-mr-xl
    div.q-mr-xl.cursor-pointer
      q-icon(
        color="black"
        size="sm"
        name="fa-solid fa-regular fa-user"
      )
      a.q-ml-sm.text-bold Minha conta
    div.cursor-pointer
      q-icon(
        color="black"
        size="sm"
        name="fa-solid fa-cart-shopping"
      )
      a.q-ml-md.text-bold Meu carrinho
  MultiMenu.multimenu
</template>

<style scoped>
a{
  color: black;
}
@media screen and (max-width: 1025px) {
  .minimenu{
    display: none;
  }
}
@media screen and (min-width: 1026px) {
  .multimenu{
    display:none
  }
}
</style>
