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
    const banners = await axios.get("mita/bannerService/allEcommerce").then(e => e.data);
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
q-carousel.cursor-pointer.banner.col(
  animated
  v-model="slide"
  infinite
  :autoplay="autoplay"
  arrows
  transition-prev="slide-right"
  transition-next="slide-left"
  @mouseenter="autoplay = false"
  @mouseleave="autoplay = true"
)
  template(
    v-for="(banner, index) in bannersCarousel"
    :key="index"
  )
    q-carousel-slide.slide.col(
      :name="index"
      :img-src="banner.fotoWebp"
    )
</template>

<style scoped>
.banner{
  display:flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  aspect-ratio: auto 1920/860;
  position: relative;
  height: auto;
  z-index: 2;
  margin-top: -165px;
  width:100%;
}
.slide{
  max-width: 100%;
  display:block;
}
@media screen and (max-width: 1150px) {
  .banner{
    margin-top: -70px;
  }
}
</style>
