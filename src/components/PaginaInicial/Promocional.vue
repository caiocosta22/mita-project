<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

function openCategoryPage (category) {
  const url = "/categorias/" + category;
  router.push(url);
}
</script>

<template lang="pug">
div.row.promocional.q-gutter-sm.q-pt-md.col.q-pl-sm
  q-img.cursor-pointer.col-5(
      src="../../assets/imgs/BOLSAS.png"
      @click="openCategoryPage(159)"
    )
  div.column.col-5
    q-img.cursor-pointer(
      src="../../assets/imgs/CHAVEIROS.png"
      @click="openCategoryPage(168)"
    )
    q-img.cursor-pointer.q-mt-lg.q-pt-sm(
      src="../../assets/imgs/NECESSAIRES.png"
      @click="openCategoryPage(150)"
    )
div.valentines.row.col
  q-img.cursor-pointer.col-10.q-pa-lg(
    src="../../assets/imgs/VALENTINES.png"
    @click="openCategoryPage(149)"
  )
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
  justify-content:center;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  aspect-ratio: auto 1920/373;
}
</style>
