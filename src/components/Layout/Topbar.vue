<script setup>
import { ref } from "vue";
const fretes = [
  "Prazo de Retirada / Envio 7 dias úteis",
  "Enviamos para todo país!"
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
q-toolbar.justify-center(style="background-color: #000; transition:1s; box-shadow:none")
  a.text-center.text-white(style="font-family:Catamaran; transition:1s") {{ padrao }}
</template>

<style scoped>

</style>
