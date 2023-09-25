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
    const banners = await axios.get("/projeto/bannerService/allEcommerce").then(e => e.data);
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
div.banner
  q-carousel.cursor-pointer.col(
    animated
    v-model="slide"
    infinite
    :autoplay="autoplay"
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
  .efeitobanner

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
.efeitobanner{
  z-index: 10;
  top: 0px;
  left: 0;
  bottom: 68%;
  width: 100%;
  margin: 0;
  padding: 40px 0;
  position: absolute;
  text-align: center;
  display: flex;
  justify-content: center;
  background-image: linear-gradient(to bottom, black,transparent);
  opacity: 0.7;
}
@media screen and (max-width: 1150px) {
  .banner{
    margin-top: -70px;
  }
}
</style>
