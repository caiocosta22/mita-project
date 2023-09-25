<script setup>
import { ref, computed, onBeforeMount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuasar } from "quasar";
import axios from "axios";

import Filtro from "../components/PaginaCategorias/Filtro.vue";
import Produtos from "../components/PaginaCategorias/TabelaProdutos.vue";

const route = useRoute();
const router = useRouter();
const $q = useQuasar();

const page = ref(1);
const items = ref([]);
const categoriesBase = ref([]);
const bannerUrlCategorie = ref("");
const itsLoading = ref(true);

const pickedCategories = ref([
  { id: route.params.categoria }
]);

async function findProductsByCategory () {
  try {
    itsLoading.value = true;
    const products = await axios.post("/projeto/servicoService/filtro-produtoV2/-1", {
      tiposServico: [],
      gruposServico: pickedCategories.value,
      marcas: [],
      palavraChave: "",
      page: page.value
    }).then(e => e.data);
    if (products.content.length) {
      products.content = products.content.map(product => {
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
      items.value = products;
    }
  } catch (e) {
    console.error("Erro ao buscar produtos da categoria: ", e);
  } finally {
    itsLoading.value = false;
  }
}

async function searchCategories () {
  try {
    const data = await axios.get("/projeto/ecommerce/categoriaAutoRelacionada/getAllCategorias").then(e => e.data);
    if (data.length) {
      categoriesBase.value = data.map(row => {
        return { ...row, name: row.descricao, children: [...row.subCategoria], foto: row.fotoUrl };
      });
      categoriesBase.value = categoriesBase.value.filter(row => row.name !== "MEIO SITE");
    }
    console.log("🚀 ~ searchCategories ~ categoriesBase.value:", categoriesBase.value);
  } catch (e) {
    console.error(e);
  }
}

watch(() => page.value, async () => {
  await findProductsByCategory();
});

onBeforeMount(async () => {
  await Promise.all([
    findProductsByCategory(),
    searchCategories()
  ]);
});

</script>

<template lang="pug">
q-page-container.row.q-pa-md.q-gutter-md.q-ml-md(style="flex-wrap:nowrap")
  Filtro
  Produtos(
    @atualizarPage="page = $event"
    :items="items"
    :loading="itsLoading"
    :bannerUrl="bannerUrlCategorie"
  )
</template>

<style scoped>
</style>
