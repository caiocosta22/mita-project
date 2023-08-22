<script setup>
import { ref } from "vue";
const fretes = [
  "Frete grátis para Fortaleza, Maracanaú e Caucaia a partir de R$100,00",
  "Frete grátis para todo o Brasil a partir de R$200,00"
];
const padrao = ref(fretes[0]);
let contador = 0;
function transicao () {
  if (contador === fretes.length - 1) {
    padrao.value = fretes[contador];
    contador = 0;
  } else {
    padrao.value = fretes[contador];
    contador++;
  }
}
const interval = 5 * 1000;
setInterval(() => {
  transicao();
}, interval);
</script>

<template lang = "pug">
q-toolbar.justify-center(style="background-color: #000;")
  a.text-center {{ padrao }}
</template>

<style scoped>
a{
  font-family: 'Outfit';
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  color: #fbea2b
}
</style>
