<script setup>
// import { ref } from "vue";
import MultiMenu from "./MultiMenu.vue";
</script>

<template lang = "pug">
q-toolbar.cabecalho.q-pa-md.row.justify-between.q-gutter-xl
  a(href="https://mita-projeto.vercel.app" style="background-color:rgba(0,0,0,0)")
    img.cursor-pointer.col-2.q-pl-xl(
      src="../../../src/assets/imgs/logo.png"
      style="width:180px;height:44px")
  div.q-gutter-sm.col-2.q-pr-xl.row.minimenu(style="flex-wrap:nowrap; box-shadow:none")
    q-icon.q-pr-xl
      img(src="../../assets/svgs/usericon.svg" style="width: 18px; height: 18px;")
      a.text-bold(href="#") Minha conta
    q-icon.q-pl-xl
      img(src="../../assets/svgs/carticon.svg" style="width: 18px; height: 18px;")
      a.text-bold(href="#") Meu carrinho
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
