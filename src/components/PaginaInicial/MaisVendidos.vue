<script setup>
import { ref, onBeforeMount } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import { useRouter } from "vue-router";
const router = useRouter();
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
    itemsToShow: 2.0,
    snapAlign: "start"
  },
  1200: {
    itemsToShow: 4.0,
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
      // * Trocar de "DESTAQUE" para  "Mais Vendidos"
      // Lielton falou para pegar da chave SESSAO_ DIA 22/09 WPP LAYOUT BANBAN
      // Falou tbm para pegar numa "chave" chamada "funcao" e buscar por "destaque"
      // Nao encontrei na api q deixaram
      const bestSellers = data.filter(sellers => sellers.chave === "SESSAO_3");
      itemsOfApi.value = bestSellers;
      console.log(itemsOfApi.value);
    }
  } catch (e) {
    console.error(e);
  }
}

onBeforeMount(async () => {
  //! A Definir
  await searchBestSellers();
});

function openProductPage (product) {
  if (product.slug) {
    const url = "/produtos/" + product.slug;
    router.push(url);
  }
}

onBeforeMount(async () => {
  //! A Definir
  await searchBestSellers();
});
</script>

<template lang="pug">
div.row.col.justify-center.q-pt-md
  div.col-10.row.justify-start
    h3.justify-start.text-black MAIS VENDIDOS
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
                div.full-width.full-height.column.justify-center.cursor-pointer(
                  @click="openProductPage(produto)"
                )
                  q-img.cursor-pointer(
                    :src="produto.fotosServico[0].foto"
                    style="display: block; max-width: 100%; border-radius: 4px;"
                  )
                  div.row.justify-between.col.q-pt-sm(style="font-size:14px")
                    div.row(style="width:50%; display:flex; text-align:left")
                      span.text-black {{ produto.titulo }}
                    template(
                      v-if="produto.promocao"
                    )
                      div.column(style="width:50%; display:flex; text-align:right")
                        span.text-black(style="font-size: 12px; text-decoration: line-through") R$:{{ produto.valor }}
                        span.text-black(style="font-size: 12px;") R$: {{ produto.precoPromocional }}
                        span.text-black(style="font-size: 12px") ou {{ produto.coligada.numeroParcelas }}x de {{ produto.valor / produto.coligada.numeroParcelas }}
                    template(
                      v-else
                    )
                      div.column(style="width:50%; display:flex; text-align:right")
                        span.text-black(style="font-size: 12px") R$: {{ produto.valor }}
    template(#addons)
      Navigation
</template>

<style scoped>
.carousel__slide {
}

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
