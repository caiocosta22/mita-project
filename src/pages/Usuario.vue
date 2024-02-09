<script setup>
import menus from "../components/PaginaLogin/Menus.vue";
import infos from "src/components/PaginaLogin/Infos.vue";
</script>

<template lang="pug">
q-page-container
  div.container
    div.interno
      menus
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 40px auto;
}
.interno {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 60%;
  margin: 0 auto;
}
</style>
