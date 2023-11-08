<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import Produtos from "../components/Layout/TabelaPesquisa.vue";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const items = ref([]);
const vazio = ref(false);

async function searchProducts (id) {
  try {
    let data = [];
    data = await axios.get(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/servicoService/filtroBuscaV2/${id}/-1/1/false/-1`).then(e => e.data);
    if (data.content && data.content.length) {
      data.content = data.content.map(product => {
        return {
          ...product,
          name: product.descricao,
          image: product.fotosServico[0].foto,
          tag: product.promocao
            ? [
              `De R$ ${product.valor}`,
              `Por R$ ${product.precoPromocional}`
            ] : [
              `R$ ${product.valor}`
            ]
        };
      });
      vazio.value = false;
      return data;
    } else {
      vazio.value = true;
      return [];
    }
  } catch (e) {
    console.error(e);
    vazio.value = true;
    return [];
  }
}

async function getTypedSearch () {
  try {
    items.value = await searchProducts(route.params.pesquisa);
  } catch (e) {
    console.error("Erro ao buscar", e);
    items.value = [];
  }
}

function openProductPage (product) {
  if (product.slug) {
    const url = "/produtos/" + product.slug;
    router.push(url);
  }
}

watch(() => route.params.pesquisa, async () => {
  await getTypedSearch();
});

onMounted(async () => {
  await getTypedSearch();
});
</script>

<template lang="pug">
q-page-container
  template(
    v-if="vazio"
  )
    div.interno(
      style="width: 85%; display: flex; margin: 0 auto; height: 600px;"
    )
      div.q-pt-lg.q-px-md.column
        p(
          style="font-size: 16px;"
        ) Produtos 0 de 0 Resultados
        p(
          style="font-size: 24px;"
        ) Nenhum item encontrado, pesquise novamente.
  template(
    v-if="!vazio"
  )
    Produtos(
      :items="items"
    )
</template>

<style scoped>

</style>
