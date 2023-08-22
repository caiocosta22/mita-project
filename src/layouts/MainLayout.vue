<template lang="pug">
q-layout(view="lHh Lpr lFf")
  q-header(elevated)
    Topbar
  router-view
  Footer
</template>

<script setup>
import Topbar from "../components/LayoutComponents/Topbaritems.vue";
import Footer from "../components/LayoutComponents/Footeritems.vue";
</script>
