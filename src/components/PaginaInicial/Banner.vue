<script setup>
import { ref, onBeforeMount } from "vue";
import axios from "axios";

const slide = ref(0);
const itsLoading = ref(true);
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
    const banners = await axios.get("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/bannerService/allEcommerce").then(e => e.data);
    bannersCarousel.value = banners.filter(banner => banner.posicionamento === "topo");
  } catch (e) {
    console.error(e);
  }
}

onBeforeMount(async () => {
  itsLoading.value = true;
  await searchTopBanners();
  itsLoading.value = false;
});

</script>

<template lang="pug">
div.banner
  template(
    v-if="itsLoading"
  )
    q-skeleton(
      height="100%"
    )
  template(
    v-else-if="!itsLoading"
  )
    q-carousel.cursor-pointer.col(
      animated
      v-model="slide"
      infinite
      swipeable
      :autoplay="autoplay"
      transition-prev="slide-right"
      transition-next="slide-left"
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
