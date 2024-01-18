<script setup>
import "vue3-carousel/dist/carousel.css";

import { ref, onBeforeMount } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import { useRouter } from "vue-router";

import axios from "axios";

const router = useRouter();
const itsLoading = ref(true);

const categoriasCarousel = ref([
  {
    descricao: "CARTEIRAS",
    fotoUrl: "https://cs210033fff90d2f7ac.blob.core.windows.net/mitaoficial/categoria-autorelacionada-servico/3368imagem2023-09-28T11:56:50.209.png",
    googleCategoriaProduto: "2668 - VestuÃ¡rio e acessÃ³rios > Bolsas, carteiras e estojos > Carteiras e clipes de dinheiro",
    id: 151,
    menuEcommerce: true,
    ordem: 3,
    slug: "carteiras",
    subCategoria: []
  },
  {
    descricao: "BOLSAS",
    fotoUrl: "https://cs210033fff90d2f7ac.blob.core.windows.net/mitaoficial/categoria-autorelacionada-servico/2913imagem2023-09-28T11:53:44.207.png",
    googleCategoriaProduto: "106 - Malas e bolsas > Bolsas a tiracolo",
    id: 159,
    menuEcommerce: true,
    ordem: 11,
    slug: "bolsas",
    subCategoria: []
  }
]);

const settings = ref({
  itemsToShow: 6,
  snapAlign: "start",
  wrapAround: true
});
const breakpoints = ref({
  368: {
    itemsToShow: 2.0,
    snapAlign: "start"
  },
  768: {
    itemsToShow: 3.0,
    snapAlign: "start"
  },
  1200: {
    itemsToShow: 6.0,
    snapAlign: "start"
  },
  1300: {
    itemsToShow: 6.0,
    snapAlign: "start"
  }
});

async function searchCategories () {
  try {
    const categorias = await axios.get("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/ecommerce/categoriaAutoRelacionada/getAllCategorias").then(e => e.data);
    const categoriascomFoto = categorias.filter(categoria => categoria.fotoUrl);
    if (categorias.length) categoriasCarousel.value = categoriascomFoto;
  } catch (e) {
    console.error(e);
  }
}

function openCategoryPage (categoria) {
  if (categoria.id) {
    const url = "/categorias/" + categoria.id;
    router.push(url);
  }
}

onBeforeMount(async () => {
  itsLoading.value = true;
  await searchCategories();
  itsLoading.value = false;
});

</script>

<template lang="pug">
div.row.col.justify-center.q-py-lg
  div.col-10.row.justify-start
    .sessao.justify-start.text-black CATEGORIAS
.container.row.col.q-pt-sm.q-mb-md
  Carousel.col-10.q-ml-sm(
      v-bind="settings"
      :breakpoints="breakpoints"
      v-show="!itsLoading"
    )
    Slide.flex.q-pr-sm(
      v-for="(categoria, index) in categoriasCarousel"
      :key="index"
    )
      div.full-width.full-height.column.justify-center(
        @click="openCategoryPage(categoria)"
      )
        q-img.cursor-pointer(
          :name="index"
          :src="categoria.fotoUrl"
          style="display: block; max-width: 100%; ;"
        )
        div.row.col.q-pt-md.justify-center(style="font-size:14px")
          span.text-black.text-center {{ categoria.descricao }}
    template(#addons)
      Navigation
</template>

<style scoped>

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
}
.container{
  display:flex;
  flex-wrap:nowrap;
  justify-content: center;
  position: relative;
  width: 100%;
  margin-bottom:20px
}
.sessao{
  color: #000;
  text-align: center;
  font-family: Catamaran;
  font-size: 35px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
}
</style>
