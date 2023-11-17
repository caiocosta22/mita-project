<script setup>
import { ref, onBeforeMount } from "vue";
import axios from "axios";

const html = ref(null);
const itsLoading = ref(true);

async function searchHTML () {
  try {
    const requisicao = await axios.get("https://mitaoficial.elevarloja.com.br/api/termoUsoService/getPolitica/SUSTENTABILIDADE").then(e => e.data);
    html.value = requisicao.termo;
  } catch (e) {
    console.error(e);
  }
}
onBeforeMount(async () => {
  itsLoading.value = true;
  await searchHTML();
  itsLoading.value = false;
});
</script>

<template lang="pug">
q-page-container
  div.container(
    v-show="!itsLoading"
  )
    div.conteudo(
      v-html="html"
    )
</template>

<style scoped>
.container {
  width: 85%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: start;
}

</style>
