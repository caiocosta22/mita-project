<script setup>
import { ref, onBeforeMount } from "vue";
import axios from "axios";

const itsLoading = ref(true);

const bannersCarousel = ref([
  {
    fotoWebp: "/images/Banner.jpeg",
    id: 0,
    image: "",
    ordem: 0,
    posicionamento: "topo"
  },
  {
    fotoWebp: "/images/Banner.jpeg",
    id: 0,
    image: "",
    ordem: 0,
    posicionamento: "topo"
  },
  {
    fotoWebp: "/images/Banner.jpeg",
    id: 0,
    image: "",
    ordem: 0,
    posicionamento: "topo"
  }
]);

async function searchTopBanners () {
  try {
    const banners = await axios.get("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/bannerService/allEcommerce").then(e => e.data);
    if (banners.length) bannersCarousel.value = banners.filter(banner => banner.posicionamento === "ilha");
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
div.row.promocional.q-gutter-sm.q-pt-md.col.q-pl-sm
  template(
    v-for="banners in bannersCarousel"
    :key="banners"
  )
    template(
      v-if="(banners.ordem === 1)"
    )
      q-img.cursor-pointer.col-5(
          :src="banners.image"
        )
  div.column.col-5
    template(
      v-for="banners in bannersCarousel"
      :key="banners"
    )
      template(
        v-if="(banners.ordem === 2)"
      )
        q-img.cursor-pointer(
          :src="banners.image"
        )
      template(
        v-if="(banners.ordem === 3)"
      )
        q-img.cursor-pointer.q-mt-lg.q-pt-sm(
          :src="banners.image"
        )
div.valentines.row.col
  template(
    v-for="banners in bannersCarousel"
    :key="banners"
  )
    template(
      v-if="(banners.ordem === 4)"
    )
      q-img.cursor-pointer.col-10(
        :src="subsec.banners[0].fotoWebp"
      )
</template>

<style scoped>
.promocional {
  display:flex;
  flex-wrap:nowrap;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  width:100%;
}
.valentines {
  display:flex;
  flex-wrap:nowrap;
  justify-content:center;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;

}
</style>
