<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
const router = useRouter();
const itemsOfApi = ref([]);

function openCategoryPage (category) {
  const url = "/categorias/" + category;
  router.push(url);
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
</script>

<template lang="pug">
div.row.promocional.q-gutter-sm.q-pt-md.col.q-pl-sm
  q-img.cursor-pointer.col-5(
      src="../../assets/imgs/BOLSAS.png"
      @click="openCategoryPage(159)"
    )
  div.column.col-5
    q-img.cursor-pointer(
      src="../../assets/imgs/CHAVEIROS.png"
      @click="openCategoryPage(168)"
    )
    q-img.cursor-pointer.q-mt-lg.q-pt-sm(
      src="../../assets/imgs/NECESSAIRES.png"
      @click="openCategoryPage(150)"
    )
div.valentines.row.col
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
            q-img.cursor-pointer.col-10.q-pa-lg(
            :src="subsec.banners[0].fotoWebp"
          )
</template>

<style scoped>
.promocional {
  display:flex;
  flex-wrap:nowrap;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  width:100%;
}
.valentines {
  display:flex;
  flex-wrap:nowrap;
  justify-content:center;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  aspect-ratio: auto 1920/373;
}
</style>
