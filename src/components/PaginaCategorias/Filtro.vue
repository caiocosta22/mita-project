<script setup>
import { ref } from "vue";
const marcas = ref(["DINHEIRO", "PIX", "CARTAO DE CREDITO"]);
const modelos = ref(["DINHEIRO", "PIX", "CARTAO DE CREDITO"]);
</script>
<template lang="pug">
.justify-center.q-gutter-sm.flex
  .column
    div.marcas.column(style="width: 257px;height: 228px;")
      q-select(bordeless v-model="model" :options="marcas" label-color="black" label="Marcas" color="black")
      q-checkbox(v-model="right" label="Label on Right")
      q-checkbox(v-model="right" label="Label on Right")
      q-checkbox(v-model="right" label="Label on Right")
      q-checkbox(v-model="right" label="Label on Right")
      q-checkbox(v-model="right" label="Label on Right")
    div.modelos.column(style="width: 257px;height: 228px;")
      q-select(bordeless v-model="model" :options="modelos" label-color="black" label="Modelo" color="black")
      q-checkbox(v-model="right" label="Label on Right")
      q-checkbox(v-model="right" label="Label on Right")
      q-checkbox(v-model="right" label="Label on Right")
      q-checkbox(v-model="right" label="Label on Right")
      q-checkbox(v-model="right" label="Label on Right")
</template>

<style scoped>
</style>
