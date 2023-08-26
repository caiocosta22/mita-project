<template lang="pug">
RouterView
</template>

<script setup>
import { onMounted } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

const $q = useQuasar();
const configsGlobais = $q.sessionStorage.getItem("configsGlobais");

async function getConfig () {
  try {
    if (!configsGlobais) {
      const configs = await axios.get("/api/configuracaoService/getConfiguracao/todas");
      $q.sessionStorage.set("configsGlobais", configs);
    }
  } catch (e) {
    console.log("Erro ao carregar configurações globais");
  }
}

onMounted(async () => {
  await getConfig();
});
</script>
