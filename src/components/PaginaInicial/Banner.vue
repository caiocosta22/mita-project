<script setup>
import { ref, onBeforeMount } from "vue";
import axios from "axios";

const slide = ref(1);
const autoplay = ref(true);
const bannersCarousel = ref([
  {
    fotoWebp: "/images/MITA-EXPERIENCE.png",
    id: 0,
    image: "",
    ordem: 0,
    posicionamento: "topo"
  },
  {
    fotoWebp: "/images/MITA-EXPERIENCE.png",
    id: 0,
    image: "",
    ordem: 0,
    posicionamento: "topo"
  },
  {
    fotoWebp: "/images/MITA-EXPERIENCE.png",
    id: 0,
    image: "",
    ordem: 0,
    posicionamento: "topo"
  }
]);

async function searchTopBanners () {
  try {
    const banners = await axios.get("/api/bannerService/allEcommerce").then(e => e.data);
    if (banners.length) bannersCarousel.value = banners.filter(banner => banner.posicionamento === "topo");
  } catch (e) {
    console.error(e);
  }
}

onBeforeMount(async () => {
  await searchTopBanners();
});

</script>

<template lang="pug">
div.column.flex
  q-carousel.cursor-pointer(
    animated
    v-model="slide"
    infinite
    :autoplay="autoplay"
    arrows
    transition-prev="slide-right"
    transition-next="slide-left"
    @mouseenter="autoplay = false"
    @mouseleave="autoplay = true"
    style="height:789px; width:100%"
  )
    template(
      v-for="(banner, index) in bannersCarousel"
      :key="index"
    )
      q-carousel-slide(
        :name="index"
        :img-src="banner.fotoWebp"
      )
</template>

<style scoped>
</style>
