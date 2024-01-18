<script setup>
import { ref, onBeforeMount } from "vue";

import axios from "axios";

const itsLoading = ref(true);
const bannersFim = ref([
  {
    fotoWebp: "https://portalvhdsjg19kbq1q36k1.blob.core.windows.net/mitaoficial/banner/2023-09-22T16:28:58.692_108.webp",
    id: 108,
    image: "https://portalvhdsjg19kbq1q36k1.blob.core.windows.net/mitaoficial/banner/2023-09-22T16:28:58.692_108.png",
    ordem: 1,
    posicionamento: "meio",
    link: "https://alastrar-mita.netlify.app/#/categorias/154"
  },
  {
    fotoWebp: "https://portalvhdsjg19kbq1q36k1.blob.core.windows.net/mitaoficial/banner/2023-09-22T16:28:58.692_108.webp",
    id: 108,
    image: "https://portalvhdsjg19kbq1q36k1.blob.core.windows.net/mitaoficial/banner/2023-09-22T16:28:58.692_108.png",
    ordem: 1,
    posicionamento: "meio",
    link: "https://alastrar-mita.netlify.app/#/categorias/154"
  }
]);

function redirectPage (link) {
  if (link) {
    const url = link;
    window.location.href = url;
  }
}

async function searchBannersFim () {
  try {
    const banners = await axios.get("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/bannerService/allEcommerce").then(e => e.data);
    if (banners.length) bannersFim.value = banners.filter(banner => banner.posicionamento === "meio");
  } catch (e) {
    console.error(e);
  }
}

onBeforeMount(async () => {
  itsLoading.value = true;
  await searchBannersFim();
  itsLoading.value = false;
});
</script>

<template lang="pug">
div.container
  div.interno(
    v-show="!itsLoading"
  )
    div.grid.q-px-sm
      template(
        v-for="(banner, index) in bannersFim"
        :key="index"
      )
        div.q-mr-sm
          q-img.cursor-pointer.foto(
            :name="index"
            :src="banner.fotoWebp"
            @click="redirectPage(banner.link)"
          )
</template>

<style scoped>
.container {
  display:flex;
  justify-content: center;
  position: relative;
  width: 100%;
}
.interno {
  width: 84%;
  margin: 0 auto;
  align-items: center;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.foto {
  max-width: 100%;
  display: block;
}
@media screen and (max-width: 820px) {
  .grid {
    grid-template-columns: 1fr
  }
  .foto {
    margin-bottom: 15px;
  }
}
</style>
