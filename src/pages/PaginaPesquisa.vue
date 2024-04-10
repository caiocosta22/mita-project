<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

import Produtos from "../components/Layout/TabelaPesquisa.vue";
import axios from "axios";

const route = useRoute();
const items = ref({});
const vazio = ref(false);
const page = ref(1);

async function searchProducts (id, page = 1, size = 12) {
  const from = (page - 1) * size;

  const body = {
    from,
    size,
    query: {
      bool: {
        must: {
          multi_match: {
            query: id,
            fields: ["descricao", "descricaoLonga", "marca", "grupos", "gtin", "codigo", "titulo", "tags", "nomeColigada", "camposExtra", "referencia"],
            fuzziness: "AUTO"
          }
        },
        filter: [
          { term: { status: true } },
          {
            bool: {
              should: [
                { term: { deletado: false } },
                { bool: { must_not: { exists: { field: "deletado" } } } }
              ]
            }
          }
        ]
      }
    }
  };

  try {
    const { data } = await axios.post("https://elevarcommerce.com.br/elastic/search?tenant=mitaoficial", body);
    const { hits } = data;
    const { total, hits: content } = hits;
    const { value: totalRows } = total;

    let products = content.map(({ _source }) => _source);

    if (products && products.length) {
      products = products.map(product => {
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
      return {
        content: products,
        totalRows
      };
    }

    vazio.value = true;
    return {};
  } catch (e) {
    vazio.value = true;
    console.error(e);
    return {};
  }
}

async function getTypedSearch (page = 1) {
  try {
    items.value = await searchProducts(route.params.pesquisa, page);
  } catch (e) {
    items.value = {};
  }
}

watch(() => page.value, async () => {
  await getTypedSearch(page.value);
});

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
      @atualizarPage="page = $event"
      :items="items"
    )
</template>

<style scoped>

</style>
