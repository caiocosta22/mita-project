<script setup>
import { onMounted, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import Produtos from "../components/Layout/TabelaPesquisa.vue";
import axios from "axios";

const route = useRoute();
const router = useRouter();
const items = ref([]);

async function searchProducts (id) {
  try {
    let data = [];
    data = await axios.get(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/servicoService/filtroBuscaV2/${id}/-1/1/false/-1`).then(e => e.data);
    if (data.content && data.content.length) {
      console.log(data.content);
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
      return data;
    } else {
      return [];
    }
  } catch (e) {
    console.error(e);
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
    Produtos(
      :items="items"
    )
</template>

<style scoped>

</style>
