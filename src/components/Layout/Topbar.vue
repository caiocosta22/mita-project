<script setup>
import { ref, onBeforeMount } from "vue";
import axios from "axios";

const slide = ref(0);
const itsLoading = ref(true);

const bannersAnuncio = ref([
  {
    fotoWebp: "https://cs210033fff90d2f7ac.blob.core.windows.net/mitaoficial/banner/2023-10-04T15:44:04.670_110.webp",
    id: 0,
    image: "",
    ordem: 0,
    posicionamento: "anuncio"
  },
  {
    fotoWebp: 0,
    id: 0,
    image: "",
    ordem: 0,
    posicionamento: "anuncio"
  },
  {
    fotoWebp: "https://cs210033fff90d2f7ac.blob.core.windows.net/mitaoficial/banner/2023-10-04T15:44:04.670_110.webp",
    id: 0,
    image: "",
    ordem: 0,
    posicionamento: "anuncio"
  }
]);

const interval = 5 * 1000;

const padrao = ref(bannersAnuncio.value[0]);

let contador = 0;

function transicao () {
  if (contador === bannersAnuncio.value.length - 1) {
    padrao.value = bannersAnuncio[contador];
    contador = 0;
  } else {
    padrao.value = bannersAnuncio[contador];
    contador++;
  }
}

setInterval(() => {
  transicao();
}, interval);

async function searchTopBanners () {
  try {
    const banners = await axios.get("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/bannerService/allEcommerce").then(e => e.data);
    if (banners.length) bannersAnuncio.value = banners.filter(banner => banner.posicionamento === "anuncio");
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

<template lang = "pug">
div(
  v-show="!itsLoading"
)
  q-carousel.cursor-pointer(
    animated
    v-model="slide"
    infinite
    swipeable
    transition-prev="slide-right"
    transition-next="slide-left"
    style="max-height: 36px;"
  )
    template(
      v-for="(banner, index) in bannersAnuncio"
      :key="index"
    )
      q-carousel-slide.slide(
        :name="index"
        :img-src="banner.fotoWebp"
        style="height: 36px; width: 100%; margin: 0 auto"
      )
</template>

<style scoped>
</style>
