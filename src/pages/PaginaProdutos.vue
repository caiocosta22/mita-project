<script setup>
// import {ref} from "vue";
import Miniaturas from "../components/PaginaProdutos/Miniaturas.vue";
import FotoPrincipal from "../components/PaginaProdutos/FotoPrincipal.vue";
</script>

<template lang="pug">
q-page-container
  .row.justify-center.q-gutter-sm
    Miniaturas
    FotoPrincipal
</template>

<style scoped>
</style>
