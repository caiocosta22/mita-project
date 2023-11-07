<template lang="pug">
q-layout(view="lHh Lpr lFf")
  router-view
  CadastroEmail
  Rodape
  </template>

<script setup>
import Rodape from "../components/Layout/Rodape.vue";
import CadastroEmail from "../components//Layout/CadastroEmail.vue";
import { onMounted } from "vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
function positioned () {
  $q.dialog({
    message: "Políticas de Privacidade: Ao clicar em Ok, você concorda com o armazenamento de cookies no seu dispositivo para melhorar a navegação no site, analisar a utilização do site e ajudar nas nossas iniciativas de marketing.",
    ok: {
      push: true,
      color: "black",
      padding: "8px 60px"
    },
    persistent: true,
    position: "bottom",
    fullWidth: true,
    seamless: true,
    style: {
      background: "rgba(255,255,255,0.8)",
      fontWeight: "600",
      fontSize: "16px",
      textAlign: "Left",
      marginBlock: "Center"
    },
    square: true
  });
}
onMounted(() => {
  positioned();
});
</script>

<style scoped>
</style>
