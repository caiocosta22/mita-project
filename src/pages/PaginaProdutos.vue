<script setup>
// import {ref} from "vue";
import Miniaturas from "../components/PaginaProdutos/Miniaturas.vue";
import FotoPrincipal from "../components/PaginaProdutos/FotoPrincipal.vue";
import Descricao from "../components/PaginaProdutos/Descricao.vue";
import Marketing from "src/components/Layout/Marketing.vue";
</script>

<template lang="pug">
q-page-container
  .row.justify-center.q-gutter-sm
    Miniaturas
    FotoPrincipal
    Descricao
  Marketing
</template>

<style scoped>
</style>
