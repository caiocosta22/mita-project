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
    posicionamento: "meio"
  },
  {
    fotoWebp: "https://portalvhdsjg19kbq1q36k1.blob.core.windows.net/mitaoficial/banner/2023-09-22T16:28:58.692_108.webp",
    id: 108,
    image: "https://portalvhdsjg19kbq1q36k1.blob.core.windows.net/mitaoficial/banner/2023-09-22T16:28:58.692_108.png",
    ordem: 1,
    posicionamento: "meio"
  }
]);

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
  div.containerfoto.q-gutter-sm.q-pa-md(
    v-show="!itsLoading"
  )
    template(
      v-for="(banner, index) in bannersFim"
      :key="index"
    )
      q-img.cursor-pointer.q-mr-sm(
        :name="index"
        :src="banner.fotoWebp"
      )
</template>

<style scoped>
.marketing{
  display:flex;
  flex-wrap:nowrap;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  width: 100%;
}
.container{
  display: flex;
  width: 100%;
  flex-wrap: nowrap;
  position: relative;
  box-sizing: border-box;
  justify-content: center;
}
.containerfoto{
  display: flex;
  width: 86%;
  margin: 0 auto;
  flex-direction: row;
}
.foto{
  display: block;
  max-width: 100%;
}
</style>
