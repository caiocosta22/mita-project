<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { useRoute } from "vue-router";

import axios from "axios";
import Filtro from "../components/PaginaCategorias/Filtro.vue";
import Produtos from "../components/PaginaCategorias/TabelaProdutos.vue";
import CategoriasLoading from "../components/PaginaCategorias/CategoriasLoading.vue";

const route = useRoute();
const page = ref(1);
const items = ref([]);
const categoriesBase = ref([]);
const bannerUrlCategorie = ref("");
const itsLoading = ref(true);

const pickedCategories = ref([
  route.params.categoria
]);

async function findProductsByCategory () {
  const size = 12;
  const from = (page.value - 1) * size;

  const categories = getCategoriesBrand(pickedCategories.value, categoriesBase.value);

  try {
    itsLoading.value = true;

    const body = {
      from,
      size,
      query: {
        bool: {
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
      },
      sort: [{ id: { order: "desc" } }]
    };

    if (categories?.length) {
      body.query.bool?.filter?.push({ terms: { "grupos.keyword": categories } });
    }

    const response = await axios.post("https://elevarcommerce.com.br/elastic/search?tenant=mitaoficial", body).then(e => e.data);

    const { hits } = response;
    const { total, hits: content } = hits;
    const { value: totalRows } = total;

    let products = content.map(({ _source }) => _source);
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

    items.value = {
      content: products,
      totalRows,
      currentPage: page.value
    };
  } catch (e) {
    console.error("Erro ao buscar produtos da categoria: ", e);
  } finally {
    itsLoading.value = false;
  }
}

async function searchCategories () {
  try {
    const data = await axios.get("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/ecommerce/categoriaAutoRelacionada/getAllCategorias").then(e => e.data);
    if (data.length) {
      categoriesBase.value = data.map(row => {
        return { ...row, name: row.descricao, children: [...row.subCategoria], foto: row.fotoUrl };
      });

      findProductsByCategory();
    }
  } catch (e) {
    console.error(e);
  }
}

function getCategoriesBrand (categories, grupos) {
  const query = [];

  for (const cat of categories) {
    const { desc, subc } = findDescricaoById(parseInt(cat), grupos);

    if (desc) {
      query.push(desc);
    }

    if (subc && subc.length) {
      subc.forEach((subcat) => {
        query.push(subcat.descricao);
      });
    }
  }

  return query;
}

function findDescricaoById (id, categories) {
  const result = findRecursive(id, categories);
  return {
    desc: result?.descricao || null,
    subc: result?.subCategoria || null
  };
}

function findRecursive (id, categorias) {
  for (const categoria of categorias) {
    if (categoria.id === id) {
      return categoria;
    }

    const result = this.findRecursive(id, categoria.subCategoria);
    if (result) {
      return result;
    }
  }

  return null;
}

watch(() => page.value, async () => {
  await findProductsByCategory();
});

watch(() => pickedCategories.value, async () => {
  await findProductsByCategory();
});

onBeforeMount(async () => {
  await Promise.all([
    searchCategories()
  ]);
});

</script>

<template lang="pug">
q-page-container.container.q-gutter-md(style="flex-wrap:nowrap")
  Filtro(
    :categories="categoriesBase"
    :pickedCategorie="route.params.categoria"
    @atualizarPage="pickedCategories = $event"
  )
  template(
      v-if="itsLoading"
    )
      CategoriasLoading
  template(
    v-if="!itsLoading"
  )
    Produtos(
      @atualizarPage="page = $event"
      :items="items"
      :loading="itsLoading"
      :bannerUrl="bannerUrlCategorie"
    )
</template>

<style scoped>
.container{
  display: flex;
  flex-direction: row;
  width: 85%;
  margin: 0 auto;
}
</style>
