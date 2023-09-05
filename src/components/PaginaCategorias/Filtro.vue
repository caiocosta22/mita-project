<script setup>
import { ref } from "vue";
const marcas = ref(["DINHEIRO", "PIX", "CARTAO DE CREDITO"]);
const modelos = ref(["DINHEIRO", "PIX", "CARTAO DE CREDITO"]);
</script>
<template lang="pug">
.justify-evenly.q-gutter-sm.flex.row
  .column.q-pa-md
    div.marcas.column(style="width: 257px;height: 257px;")
      q-select(bordeless v-model="model" :options="marcas" label-color="black" label="Marcas" color="black")
      q-separator(color="black")
      q-checkbox(v-model="Left" label="iPhone" text-color="black" color="black")
      q-checkbox(v-model="Left" label="Samsung" text-color="black" color="black")
      q-checkbox(v-model="Left" label="LG" text-color="black" color="black")
      q-checkbox(v-model="Left" label="Motorola" text-color="black" color="black")
      q-checkbox(v-model="Left" label="Xiaomi" text-color="black" color="black")
    div.modelos.column(style="width: 257px;height: 257px;")
      q-select(bordeless v-model="model" :options="modelos" label-color="black" label="Modelo" color="black")
      q-separator(color="black")
      q-checkbox(v-model="Left" label="iPhone X" text-color="black" color="black")
      q-checkbox(v-model="Left" label="iPhone XR" text-color="black" color="black")
      q-checkbox(v-model="Left" label="iPhone 11" text-color="black" color="black")
      q-checkbox(v-model="Left" label="iPhone 11 PRO" text-color="black" color="black")
      q-checkbox(v-model="Left" label="iPhone 12" text-color="black" color="black")
</template>

<style scoped>
</style>
