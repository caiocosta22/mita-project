<script setup>
import { ref } from "vue";
const links = ref([
  "VIAGENS",
  "NECESSAIRES",
  "CARTEIRAS",
  "HOME",
  "OFFICE",
  "MASCULINO",
  "FEMININO",
  "PET",
  "UTILITÁRIOS",
  "PACCO",
  "BOLSAS"
]);
</script>

<template lang="pug">
div.row.q-mb-sm
  q-toolbar.bg-white.justify-evenly.q-pa-sm.col-6.q-pl-xl
    a.text-black.text-bold.text-capitalize.cursor-pointer(
      v-for="link in links"
      :key="link"
    ) {{ link }}
</template>
<style scoped>
</style>
