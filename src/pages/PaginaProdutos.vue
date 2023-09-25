<script setup>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";

import Marketing from "src/components/Layout/Marketing.vue";
import DetalhesProdutoLoading from "../components/PaginaProdutos/DetalhesProdutoLoading.vue";
import DetalhesProduto from "../components/PaginaProdutos/DetalhesProduto.vue";

const route = useRoute();
const router = useRouter();
const $q = useQuasar();

const product = ref({});
const itsLoaded = ref(false);

async function searchProductById (productId) {
  try {
    itsLoaded.value = false;
    product.value = await axios.get(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/servicoService/productBySlugEcommerceV2/${productId}/-1`).then(e => e.data);
  } catch (e) {
    $q.notify({
      message: "Erro ao buscar produto, redirecionando para página principal!"
    });
    router.push("/");
  } finally {
    itsLoaded.value = true;
  }
}

onMounted(async () => {
  await searchProductById(route.params.produto);
});

</script>

<template lang="pug">
q-page-container
  DetalhesProduto(
    v-if="itsLoaded"
    :product="product"
  )
  DetalhesProdutoLoading(
    v-else
  )
  Marketing
</template>

<style scoped>
</style>
