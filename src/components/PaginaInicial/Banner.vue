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
const bannersMobile = ref([{
  foto: "https://portalvhdsjg19kbq1q36k1.blob.core.windows.net/mitaoficial/banner/Banner.png",
  fotoWebp: "https://portalvhdsjg19kbq1q36k1.blob.core.windows.net/mitaoficial/banner/Banner.png",
  id: 103,
  ordem: 1,
  posicionamento: "topo",
  status: true
}]);

async function searchTopBanners () {
  try {
    const banners = await axios.get("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/bannerService/allEcommerce").then(e => e.data);
    bannersCarousel.value = banners.filter(banner => banner.posicionamento === "topo");
  } catch (e) {
    console.error(e);
  }
}

async function searchMobileBanners () {
  try {
    const banners = await axios.get("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/bannerService/all").then(e => e.data);
    bannersMobile.value = banners.filter(banner => banner.posicionamento === "topo");
  } catch (e) {
    console.error(e);
  }
}

onBeforeMount(async () => {
  itsLoading.value = true;
  await searchTopBanners();
  await searchMobileBanners();
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
    q-carousel#full.cursor-pointer.col(
      animated
      v-model="slide"
      infinite
      swipeable
      :autoplay="autoplay"
      transition-prev="slide-right"
      transition-next="slide-left"
      spinner
    )
      template(
        v-for="(banner, index) in bannersCarousel"
        :key="index"
      )
        q-carousel-slide.slide.col(
          :name="index"
          :img-src="banner.image"
          spinner
        )
    q-carousel#mobile.cursor-pointer.col(
      animated
      v-model="slide"
      infinite
      swipeable
      :autoplay="autoplay"
      transition-prev="slide-right"
      transition-next="slide-left"
      spinner
    )
      template(
        v-for="(banner, index) in bannersMobile"
        :key="index"
      )
        q-carousel-slide.slide.col(
          :name="index"
          :img-src="banner.fotoWebp"
          spinner
        )
  .efeitobanner

</template>

<style scoped>

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
.slide{
  max-width: 100%;
  display:block;
}
.banner{
  display:flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  position: relative;
  height: auto ;
  z-index: 2;
  margin-top: -165px;
  width:100%;
  aspect-ratio: 1920/720;
}
@media screen and (max-width: 1150px) {
  .banner{
    margin-top: -70px;
  }
}
@media (max-width: 1024px) {
  #full {
    display: none;
  }
  .banner {
    aspect-ratio: auto 769/700;
  }
}
@media screen and (min-width: 1024px) {
  #mobile {
    display: none;
  }
}
</style>
