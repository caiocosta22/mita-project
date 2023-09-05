<script setup>
import { ref, computed } from "vue";
import Capaiphone from "../../assets/imgs/CAPAIPHONE.png";
import Bolsa from "../../assets/imgs/BOLSA.png";
import Carteira from "../../assets/imgs/CARTEIRA.png";
import Chavecarro from "../../assets/imgs/CHAVECARRO.png";

const currentOffset = ref(0);
const windowSize = 4;
const paginationFactor = 340;
const items = ref([
  {
    name: "Case para Iphone",
    image: Capaiphone,
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
  },
  {
    name: "Necessaire veneza pequena",
    image: Bolsa,
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
  },
  {
    name: "Chaveiro em couro para chave de carro",
    image: Chavecarro,
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
  },
  {
    name: "Carteira feminina",
    image: Carteira,
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
  },
  {
    name: "Case Iphone",
    image: Capaiphone,
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
  },
  {
    name: "Case Iphone",
    image: Capaiphone,
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
  },
  {
    name: "Case Iphone",
    image: Capaiphone,
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"]
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
.card-carousel-wrapper.col
  q-icon.cursor-pointer.q-mr-sm(
    name="chevron_left"
    size="2.5em"
    color="black"
    @click="moveCarousel(-1)"
  )
  .card-carousel
    .card-carousel--overflow-container
      .card-carousel-cards(:style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}")
        .card-carousel--card(v-for="item in items" :key="item")
          img(:src="item.image")
          .card-carousel--card--footer.q-pa-sm.text-black
            p {{ item.name }}
            p.tag.text-bold(v-for="(tag,index) in item.tag" :key="index" :class="index > 0 ? 'secondary' : ''") {{ tag }}
  q-icon.cursor-pointer.q-ml-md(
    name="chevron_right"
    size="2.5em"
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
  height: 320px;
  width: 320px
  }
  *{
  color: black;
}
</style>
