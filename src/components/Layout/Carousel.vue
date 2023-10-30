<script setup>
import { ref, onBeforeMount } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import axios from "axios";
import "vue3-carousel/dist/carousel.css";

const items = ref([
  {
    name: "Case para Iphone",
    image: "Capaiphone",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"],
    src: "../../assets/imgs/capaiphone.png"
  },
  {
    name: "Necessaire veneza pequena",
    image: "Bolsa",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"],
    src: "../../assets/imgs/capaiphone.png"
  },
  {
    name: "Chaveiro em couro para chave de carro",
    image: "Chavecarro",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"],
    src: "../../assets/imgs/capaiphone.png"
  },
  {
    name: "Carteira feminina",
    image: "Carteira",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"],
    src: "../../assets/imgs/capaiphone.png"
  },
  {
    name: "Case Iphone",
    image: "Capaiphone",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"],
    src: "../../assets/imgs/capaiphone.png"
  },
  {
    name: "Case Iphone",
    image: "Capaiphone",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"],
    src: "../../assets/imgs/capaiphone.png"
  },
  {
    name: "Case Iphone",
    image: "Capaiphone",
    tag: ["De R$ 279,90", "Por 259,00", "Ou 10x de 25,90"],
    src: "../../assets/imgs/capaiphone.png"
  }
]);
const itemsOfApi = ref([]);

const breakpoints = ref({
  368: {
    itemsToShow: 2.0,
    snapAlign: "start"
  },
  1200: {
    itemsToShow: 3.0,
    snapAlign: "start"
  },
  1300: {
    itemsToShow: 4,
    snapAlign: "start"
  }
});

async function searchBestSellers () {
  try {
    const data = await axios.get("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/ecommerce/secaoEcommerceService/getAllSessions?plataforma=SITE").then(e => e.data);
    if (data.length) {
      const bestSellers = data.filter(sellers => sellers.chave === "SESSAO_3");
      itemsOfApi.value = bestSellers;
    }
  } catch (e) {
    console.error(e);
  }
}

onBeforeMount(async () => {
  await searchBestSellers();
});
</script>

<template lang="pug">
.container.row.col
  Carousel.col-10(v-bind="settings" :breakpoints="breakpoints")
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
              Slide.flex.q-pr-sm(
                v-for="produto in subsec.produtos"
                :key="produto"
              )
                div.full-width.full-height.column.justify-center
                  q-img.cursor-pointer(
                    :src="produto.fotosServico[0].foto"
                    style="display: block; max-width: 100%; ;"
                  )
                  div.row.justify-between.col.q-pt-sm(style="font-size:16px")
                    span.text-black.text-bold {{ produto.titulo }}
                    template(
                      v-if="produto.promocao"
                    )
                      div.row
                        span.text-black.text-bold(style="font-size: 16px;") De R$:{{ produto.valor }}
                        span.text-black.text-bold(style="font-size: 16px;") Por R$: {{ produto.precoPromocional }}
                    template(
                      v-else
                    )
                      div.row
                        span.text-black.text-bold(style="font-size: 16px;") R$: {{ produto.valor }}
    template(#addons)
      Navigation
</template>

<style>
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
