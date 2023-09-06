<script setup>
import Filtro from "../components/PaginaCategorias/Filtro.vue";
import Produtos from "../components/PaginaCategorias/Produtos.vue";
</script>

<template lang="pug">
q-page-container.row.q-pa-md.q-gutter-md.q-ml-md(style="flex-wrap:nowrap")
  Filtro
  Produtos
</template>

<style scoped>
</style>
