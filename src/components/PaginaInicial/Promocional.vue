<script setup>
</script>

<template lang="pug">
.row.promocional.q-gutter-sm.q-pt-md.col
  q-img.cursor-pointer.col-4(src="../../assets/imgs/BOLSAS.png")
  .column.col-4
    q-img.cursor-pointer(src="../../assets/imgs/CHAVEIROS.png")
    q-img.cursor-pointer.q-mt-lg(src="../../assets/imgs/NECESSAIRES.png")
.valentines.row.col
  q-img.cursor-pointer.col-8(src="../../assets/imgs/VALENTINES.png")
</template>

<style scoped>
.promocional {
  display:flex;
  flex-wrap:nowrap;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  width:100%;
}
.valentines {
  display:flex;
  flex-wrap:nowrap;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding: 20px;
}
</style>
