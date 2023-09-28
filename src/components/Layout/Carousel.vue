<script setup>
import { ref, onBeforeMount } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import axios from "axios";
import "vue3-carousel/dist/carousel.css";

const itemsOfApi = ref([]);
const settings = ref({
  itemsToShow: 1,
  snapAlign: "center"
});
const breakpoints = ref({
  368: {
    itemsToShow: 2.0,
    snapAlign: "center"
  },
  700: {
    itemsToShow: 3.5,
    snapAlign: "center"
  },
  1024: {
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
</script>

<template lang="pug">
.container.row.col.flex.justify-center
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
              Slide(
                v-for="produto in subsec.produtos"
                :key="produto"
              )
                div(
                  class="carousel__item"
                )
                  div.col.full-width.full-height
                    q-img.col-8(
                      :src="produto.fotosServico[0].foto"
                    )
                    div.row.justify-between.cursor-pointer.q-py-lg(style="font-size:18px")
                      p.text-black.text-bold {{ produto.titulo }}
                      template(
                        v-if="produto.promocao"
                      )
                        div
                          div.tag.text-black.text-bold(style="font-size: 16px;") De R$:{{ produto.valor }}
                          p.tag.text-black.text-bold(style="font-size: 18px;") Por R$: {{ produto.precoPromocional }}
                      template(
                        v-else
                      )
                        p.text-black.text-bold(style="font-size: 20px;") R$: {{ produto.valor }}
    template(#addons)
      Navigation
</template>

<style>
.carousel__item {
  min-height: 200px;
  width: 100%;
  background-color: white;
  color: white;
  font-size: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.carousel__slide {
  padding: 10px;
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
  box-sizing: border-box;
  width: 100%;
  margin-bottom:20px
}
</style>
