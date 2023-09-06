<script setup>
import { ref } from "vue";
const marcas = ref(["DINHEIRO", "PIX", "CARTAO DE CREDITO"]);
const modelos = ref(["DINHEIRO", "PIX", "CARTAO DE CREDITO"]);
const isChecked = ref(false);
</script>
<template lang="pug">
.justify-evenly.q-gutter-sm.flex.row
  .column
    div.secao.row(style="width: 257px;height: 100px;")
      img(style="width:15px;height:15px" src="../../assets/imgs/casaicon.png")
      p /CASE SMARTPHONE
    div.marcas.column(style="width: 257px;height: 257px;")
      q-select(bordeless v-model="model" :options="marcas" label-color="black" label="Marcas" color="black" blocked)
      q-separator(color="black")
      q-checkbox(v-model="isChecked" label="iPhone" color="black")
      q-checkbox(v-model="val" label="Samsung" text-color="black" color="black")
      q-checkbox(v-model="val" label="LG" text-color="black" color="black")
      q-checkbox(v-model="val" label="Motorola" text-color="black" color="black")
      q-checkbox(v-model="val" label="Xiaomi" text-color="black" color="black")
    div.modelos.column(style="width: 257px;height: 257px;")
      q-select(bordeless v-model="model" :options="modelos" label-color="black" label="Modelo" color="black")
      q-separator(color="black")
      q-checkbox(v-model="val" label="iPhone X" text-color="black" color="black" )
      q-checkbox(v-model="val" label="iPhone XR" text-color="black" color="black")
      q-checkbox(v-model="val" label="iPhone 11" text-color="black" color="black")
      q-checkbox(v-model="val" label="iPhone 11 PRO" text-color="black" color="black")
      q-checkbox(v-model="val" label="iPhone 12" text-color="black" color="black")
</template>

<style scoped>
</style>
