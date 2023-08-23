<script setup>
import { ref } from "vue";
const slide = ref(1);
const autoplay = ref(true);
</script>

<template lang="pug">
q-carousel.col.cursor-pointer(
  animated
  v-model="slide"
  infinite
  :autoplay="autoplay"
  arrows
  transition-prev="slide-right"
  transition-next="slide-left"
  @mouseenter="autoplay = false"
  @mouseleave="autoplay = true"
  height="792px"
  width="100%")
    q-carousel-slide(:name="1" img-src="../../assets/imgs/MITA-EXPERIENCE.png" style="height:500px")
    q-carousel-slide(:name="2" img-src="../../assets/imgs/MITA-EXPERIENCE.png")
    q-carousel-slide(:name="3" img-src="../../assets/imgs/MITA-EXPERIENCE.png")
</template>

<style scoped>
</style>
