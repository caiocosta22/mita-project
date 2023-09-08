<script setup>
import { ref, computed, onBeforeMount } from "vue";
import axios from "axios";
import Capaiphone from "../../assets/imgs/CAPAIPHONE.png";
import Bolsa from "../../assets/imgs/BOLSA.png";
import Carteira from "../../assets/imgs/CARTEIRA.png";
import Chavecarro from "../../assets/imgs/CHAVECARRO.png";

const currentOffset = ref(0);
const itemsOfApi = ref([]);
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

const productsApiLength = computed(() => {
  let countProducts = 0;
  itemsOfApi.value.forEach(item => {
    if (item.subsecoesEcommerce) {
      item.subsecoesEcommerce.forEach(sub => {
        if (sub.produtos) {
          countProducts += sub.produtos.length;
        }
      });
    }
  });
  return countProducts;
});

const atEndOfList = computed(() => {
  if (!itemsOfApi.value.length) return currentOffset.value <= (paginationFactor * -1) * (items.value.length - windowSize);
  return currentOffset.value <= (paginationFactor * -1) * (productsApiLength.value - windowSize);
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

// eslint-disable-next-line no-unused-vars
async function searchBestSellers () {
  try {
    const data = await axios.get("https://elevar.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/ecommerce/secaoEcommerceService/getAllSessions?plataforma=SITE").then(e => e.data);
    if (data.length) {
      // * Trocar "DESTAQUE" para  "Mais Vendidos"
      const bestSellers = data.filter(sellers => sellers.titulo === "DESTAQUE");
      itemsOfApi.value = bestSellers;
    }
  } catch (e) {
    console.error(e);
  }
}

onBeforeMount(async () => {
  //! A Definir
  await searchBestSellers();
});
</script>

<template lang="pug">
.card-carousel-wrapper.col
  q-icon.cursor-pointer.q-mr-sm(
    name="chevron_left"
    size="2.5em"
    color="black"
    @click="moveCarousel(-1)"
  )
  .card-carousel(
    v-if="!itemsOfApi.length"
  )
    .card-carousel--overflow-container
      .card-carousel-cards(:style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}")
        .card-carousel--card(v-for="item in items" :key="item")
          img(:src="item.image")
          .card-carousel--card--footer.q-pa-sm.text-black
            p {{ item.name }}
            p.tag.text-bold(v-for="(tag,index) in item.tag" :key="index" :class="index > 0 ? 'secondary' : ''") {{ tag }}
  .card-carousel(
    v-else
  )
    .card-carousel--overflow-container
      .card-carousel-cards(
        :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}"
      )
        template(
          v-for="(item, index) in itemsOfApi"
          :key="index"
        )
          template(v-if="item.orientacao === 'horizontal'")
            template(
              v-if="item.subsecoesEcommerce"
            )
              template(
                v-for="subsec in item.subsecoesEcommerce"
                :key="subsec"
              )
                template(
                  v-if="subsec.produtos"
                )
                  template(
                    v-for="produto in subsec.produtos"
                    :key="produto"
                  )
                    .card-carousel--card--footer.q-pa-sm.text-black.text-bold
                      q-img.image(
                        v-if="produto.fotosServico[0].urlMWebp"
                        :src="produto.fotosServico[0].urlMWebp"
                      )
                      .row.justify-between
                        .q-py-lg(style="font-size:22px") {{ produto.titulo }}
                        template(
                        v-if="produto.promocao"
                      )
                          .column.q-pa-md.q-pr-md
                            .tag.text-black(style="font-size: 16px;") De R$:{{ produto.valor }}
                            p.tag.text-black(style="font-size: 20px;") Por R$: {{ produto.precoPromocional }}
                        template(
                        v-else
                      )
                            p.tag.text-black.q-py-lg.q-pr-md(style="font-size: 20px;") R$: {{ produto.valor }}
            template(v-if="item.orientacao === 'vertical'")
              p Lógica para vertical aqui!!!
  q-icon.cursor-pointer.q-ml-md(
    name="chevron_right"
    size="2.5em"
    color="black"
    @click="moveCarousel(1)"
  )
</template>

<style scoped>
.image {
  vertical-align: bottom !important;
  border-top-left-radius: 4px !important;
  border-top-right-radius: 4px !important;
  transition: opacity 150ms linear !important;
  user-select: none !important;
  height: 320px !important;
  width: 320px !important;
}
* {
  color: black;
}
</style>
