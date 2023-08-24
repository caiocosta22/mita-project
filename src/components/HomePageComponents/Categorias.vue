<script setup>
import { ref, computed } from "vue";
import necessaire from "../../assets/imgs/1.png";
import capa from "../../assets/imgs/2.png";
import chaveiro from "../../assets/imgs/3.png";
import bolsa from "../../assets/imgs/4.png";
import garrafa from "../../assets/imgs/5.png";
import carteira from "../../assets/imgs/6.png";
const currentOffset = ref(0);
const windowSize = 6;
const paginationFactor = 180;
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
</script>

<template lang="pug">
.card-carousel-wrapper2
  q-icon.cursor-pointer.q-mr-md(
    name="chevron_left"
    size="3.5em"
    color="black"
    @click="moveCarousel(-1)"
  )
  .card-carousel2
    .card-carousel--overflow-container
      .card-carousel-cards(:style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}")
        .card-carousel--card(v-for="item in items" :key="item" style=" box-shadow:none")
          img(
            style="width: 160px; height: 160px;"
            :src="item.image"
          )
          .card-carousel--card--footer.text-bold.text-black.text-center
            p.q-pa-sm {{ item.name }}
            p.tag(v-for="(tag,index) in item.tag" :key="index" :class="index > 0 ? 'secondary' : ''") {{ tag }}
  q-icon.cursor-pointer.q-mr-md(
    name="chevron_right"
    size="3.5em"
    color="black"
    @click="moveCarousel(1)"
  )
</template>

<style scoped>
img {
  vertical-align: bottom;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  transition: opacity 150ms linear;
  user-select: none;
  height: 160px;
  width: 160px;
}
*{
  color: black;
}
</style>
