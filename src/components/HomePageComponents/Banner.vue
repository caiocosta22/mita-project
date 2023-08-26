<script setup>
import { ref } from "vue";
const slide = ref(1);
const autoplay = ref(true);
</script>

<template lang="pug">
q-carousel.banner.cursor-pointer(
  animated
  v-model="slide"
  infinite
  :autoplay="autoplay"
  arrows
  transition-prev="slide-right"
  transition-next="slide-left"
  @mouseenter="autoplay = false"
  @mouseleave="autoplay = true"
  style="height:789px;"
  ).col
    q-carousel-slide(:name="1" img-src="../../assets/imgs/MITA-EXPERIENCE.png").col
    q-carousel-slide(:name="2" img-src="../../assets/imgs/MITA-EXPERIENCE.png").col
    q-carousel-slide(:name="3" img-src="../../assets/imgs/MITA-EXPERIENCE.png").col
</template>

<style scoped>
.banner{
  z-index:10
}
</style>
