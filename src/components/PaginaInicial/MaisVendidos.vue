<script setup>
import { ref, onBeforeMount } from "vue";
import { Carousel, Navigation, Slide } from "vue3-carousel";
import { useRouter } from "vue-router";
import axios from "axios";
import "vue3-carousel/dist/carousel.css";

const router = useRouter();

const itemsOfApi = ref([]);
const settings = ref({
  itemsToShow: 1,
  snapAlign: "center",
  wrapAround: true
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

function formatCurrency (value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  });
}

function formatPercentage (value) {
  return value.toLocaleString("en-us", {
    maximumFractionDigits: 0
  });
}

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
div.row.col.justify-center.q-pt-md(style="align-items:center")
  div.col-10.row.justify-start.q-pt-sm
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
            .sessao.justify-start.text-black {{ subsec.titulo }}
.container.row.col
  Carousel.col-10.q-ml-sm(v-bind="settings" :breakpoints="breakpoints")
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
                    style="display: block; max-width: 100%; ;"
                  )
                    template(
                      v-if="produto.promocao"
                    )
                      div.tag {{ formatPercentage(produto.precoPromocional / produto.valor * 10) }}% OFF!
                  div.row.justify-between.col.q-pt-sm(style="font-size:14px")
                    div.row(style="width:50%; display:flex; text-align:left")
                      span.text-black {{ produto.titulo }}
                    template(
                      v-if="produto.promocao"
                    )
                      div.column(style="width:50%; display:flex; text-align:right")
                        span.text-black(style="font-size: 14px; text-decoration: line-through") {{ formatCurrency(produto.valor) }}
                        span.text-black(style="font-size: 14px;") {{ formatCurrency(produto.precoPromocional) }}
                        span.text-black(style="font-size: 14px") ou {{ produto.coligada.numeroParcelas }}x de {{ formatCurrency(produto.valor / produto.coligada.numeroParcelas) }}
                    template(
                      v-else
                    )
                      div.column(style="width:50%; display:flex; text-align:right")
                        span.text-black(style="font-size: 14px") {{ formatCurrency(produto.valor) }}
    template(#addons)
      Navigation
</template>

<style scoped>
.sessao{
  color: #000;
  text-align: center;
  font-family: Catamaran;
  font-size: 35px;
  font-style: normal;
  font-weight: 100;
  line-height: normal;
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
  margin-bottom:20px;
}
.tag{
  color: #FFF;
  font-family: Catamaran;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  top:10px;
  left: 10px;
  height: 10px;
  align-items: center;
  display: flex;
}

</style>
