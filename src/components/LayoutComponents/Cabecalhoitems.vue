<script setup>
</script>

<template lang = "pug">
q-toolbar.q-pa-md.row.justify-between.q-gutter-xl
  img.cursor-pointer.col-2.q-pl-xl(
    src="../../../src/assets/imgs/logo.png"
      style="width:180px;height:49px")
  div.q-gutter-sm.col-2.q-pr-lg.row(style="flex-wrap:nowrap")
    q-icon.q-pr-xl
      img(src="../../assets/svgs/usericon.svg" style="width: 18px; height: 18px;")
      a.text-bold(href="#") Minha conta
    q-icon.q-pl-xl
      img(src="../../assets/svgs/carticon.svg" style="width: 18px; height: 18px;")
      a.text-bold(href="#") Meu carrinho
</template>

<style scoped>
*{
  color:black
}
q-toolbar{
  background-color: rgba(0,0,0,0);
}
</style>
