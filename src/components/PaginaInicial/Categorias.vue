<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import necessaire from "../../assets/imgs/1.png";
import capa from "../../assets/imgs/2.png";
import chaveiro from "../../assets/imgs/3.png";
import bolsa from "../../assets/imgs/4.png";
import garrafa from "../../assets/imgs/5.png";
import carteira from "../../assets/imgs/6.png";

const router = useRouter();
const currentOffset = ref(0);
const hasItems = ref(true);
const windowSize = 6;
const paginationFactor = 220;
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

const atEndOfList = computed(() => {
  return currentOffset.value <= (paginationFactor * -1) * (items.value.length - windowSize);
});

const atHeadOfList = computed(() => {
  return currentOffset.value === 0;
});

const moveCarousel = (direction) => {
  if (direction === 1 && !atEndOfList.value) {
    currentOffset.value -= paginationFactor;
  } if (direction === -1 && !atHeadOfList.value) {
    currentOffset.value += paginationFactor;
  }
};

async function searchCategories () {
  try {
    const data = await axios.get("/api/ecommerce/categoriaAutoRelacionada/getAllCategorias").then(e => e.data);
    let itemsForItems = [];
    if (data.length) {
      itemsForItems = data.map(categorie => {
        return {
          ...categorie,
          name: categorie.descricao,
          image: categorie.bannerUrl
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
div(
  v-if="hasItems"
)
  div
    p.titulo CATEGORIAS
  div.card-carousel-wrapper2
    q-icon.cursor-pointer.q-mr-sm(
      name="chevron_left"
      size="2.5em"
      color="black"
      @click="moveCarousel(-1)"
    )
    div.card-carousel2
      div.card-carousel--overflow-container
        div.card-carousel-cards(
          :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}"
        )
          div.card-carousel--card(
            v-for="item in items"
            :key="item"
            style="box-shadow:none"
          )
            img.cursor-pointer(
              @click="openCategoryPage(item)"
              v-if="item.image"
              :src="item.image"
            )
            div.card-carousel--card--footer.text-bold.text-black.text-center
              p.q-pa-sm {{ item.name }}
              p.tag(v-for="(tag,index) in item.tag" :key="index" :class="index > 0 ? 'secondary' : ''") {{ tag }}
    q-icon.cursor-pointer.q-ml-sm(
      name="chevron_right"
      size="2.5em"
      color="black"
      @click="moveCarousel(1)"
    )
</template>

<style scoped>
.titulo{
  color: #000;
  text-align: center;
  font-family: Catamaran;
  font-size: 35px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
}
img {
  vertical-align: bottom;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: opacity 150ms linear;
  user-select: none;
  height: 200px;
  width: 200px;
}
*{
  color: black;
}
</style>
