<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import "vue3-carousel/dist/carousel.css";
import { useRouter } from "vue-router";
import axios from "axios";
import necessaire from "../../assets/imgs/1.png";
import capa from "../../assets/imgs/2.png";
import chaveiro from "../../assets/imgs/3.png";
import bolsa from "../../assets/imgs/4.png";
import garrafa from "../../assets/imgs/5.png";
import carteira from "../../assets/imgs/6.png";

const router = useRouter();
const hasItems = ref(true);
const items = ref([
  {
    name: "NECESSAIRES",
    image: necessaire
  },
  {
    name: "CAPAS",
    image: capa
  },
  {
    name: "CHAVEIROS",
    image: chaveiro
  },
  {
    name: "BOLSAS",
    image: bolsa
  },
  {
    name: "GARRAFAS",
    image: garrafa
  },
  {
    name: "CARTEIRAS",
    image: carteira
  },
  {
    name: "NECESSAIRES",
    image: necessaire
  },
  {
    name: "CAPAS",
    image: capa
  },
  {
    name: "CHAVEIROS",
    image: chaveiro
  }
]);
const settings = ref({
  itemsToShow: 1,
  snapAlign: "center"
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
    itemsToShow: 6,
    snapAlign: "start"
  }
});

async function searchCategories () {
  try {
    let data = await axios.get("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/ecommerce/categoriaAutoRelacionada/getAllCategorias").then(e => e.data);
    data = data.find(row => row.descricao === "MEIO SITE").subCategoria;
    let itemsForItems = [];
    if (data.length) {
      itemsForItems = data.map(categorie => {
        return {
          ...categorie,
          name: categorie.descricao,
          image: categorie.fotoUrl || categorie.bannerUrl
        };
      });
    }
    const finalItems = itemsForItems.filter(item => item.image);
    if (finalItems.length) items.value = finalItems;
  } catch (e) {
    console.error(e);
  }
}

function openCategoryPage (category) {
  if (category.id) {
    const url = "/categorias/" + category.id;
    router.push(url);
  }
}

onBeforeMount(async () => {
  await searchCategories();
});

</script>

<template lang="pug">
div.row.col.justify-center.q-py-lg
  div.col-10.row.justify-start
    h3.justify-start.text-black CATEGORIAS
.container.row.col.q-pt-sm.q-mb-md
  Carousel.col-10(v-bind="settings" :breakpoints="breakpoints")
    template(
      v-if="hasItems"
    )
      Slide.flex.q-pr-sm(
        v-for="item in items"
        :key="item"
      )
        div.full-width.full-height.column.justify-center(
          @click="openCategoryPage(item)"
        )
          q-img.cursor-pointer(
            v-if="item.image"
            :src="item.image"
            style="display: block; max-width: 100%; border-radius: 4px;"
          )
          div.row.col.q-pt-md.justify-center(style="font-size:16px")
            span.text-black.text-bold.text-center {{ item.name }}
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
</style>
