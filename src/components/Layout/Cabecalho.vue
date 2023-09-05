<script setup>
</script>

<template lang = "pug">
q-toolbar.cabecalho.q-pa-md.row.justify-between.q-gutter-xl
  a(href="https://mita-projeto.vercel.app" style="background-color:rgba(0,0,0,0)")
    img.cursor-pointer.col-2.q-pl-xl(
      src="../../../src/assets/imgs/logo.png"
      style="width:180px;height:44px")
  div.q-gutter-sm.col-2.q-pr-lg.row(style="flex-wrap:nowrap; box-shadow:none")
    q-icon.q-pr-xl
      img(src="../../assets/svgs/usericon.svg" style="width: 18px; height: 18px;")
      a.text-bold(href="#") Minha conta
    q-icon.q-pl-xl
      img(src="../../assets/svgs/carticon.svg" style="width: 18px; height: 18px;")
      a.text-bold(href="#") Meu carrinho
</template>

<style scoped>
a{
  color: black;
}
</style>
