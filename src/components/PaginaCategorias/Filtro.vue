<script setup>
import { ref } from "vue";
const model = ref([]);
const val1 = ref(false);
const val2 = ref(false);
const val3 = ref(false);
const val4 = ref(false);
const val5 = ref(false);
const val6 = ref(false);
const val7 = ref(false);
const val8 = ref(false);
const val9 = ref(false);
const isChecked = ref(false);

const marcas = ref(["DINHEIRO", "PIX", "CARTAO DE CREDITO"]);
const modelos = ref(["DINHEIRO", "PIX", "CARTAO DE CREDITO"]);
</script>
<template lang="pug">
div.justify-evenly.q-gutter-sm.flex.row
  div.column
    div.secao.row(style="width: 257px;height: 100px;")
      img(style="width:15px;height:15px" src="../../assets/imgs/casaicon.png")
      p /CASE SMARTPHONE
    div.marcas.column(style="width: 257px;height: 257px;")
      //- Procure por multiplas checkbox no quasar e NÃO ESQUEÇA DE CRIAR AS REFS
      q-select(bordeless v-model="model" :options="marcas" label-color="black" label="Categorias" color="black" blocked)
      q-separator(color="black")
      q-checkbox(v-model="isChecked" label="iPhone" color="black")
      q-checkbox(v-model="val1" label="Samsung" text-color="black" color="black")
      q-checkbox(v-model="val2" label="LG" text-color="black" color="black")
      q-checkbox(v-model="val3" label="Motorola" text-color="black" color="black")
      q-checkbox(v-model="val4" label="Xiaomi" text-color="black" color="black")
    div.modelos.column(style="width: 257px;height: 257px;")
      q-select(bordeless v-model="model" :options="modelos" label-color="black" label="Modelo" color="black")
      q-separator(color="black")
      q-checkbox(v-model="val5" label="iPhone X" text-color="black" color="black" )
      q-checkbox(v-model="val6" label="iPhone XR" text-color="black" color="black")
      q-checkbox(v-model="val7" label="iPhone 11" text-color="black" color="black")
      q-checkbox(v-model="val8" label="iPhone 11 PRO" text-color="black" color="black")
      q-checkbox(v-model="val9" label="iPhone 12" text-color="black" color="black")
</template>

<style scoped>
</style>
