<script setup>
import DetalhesProduto from "../components/PaginaProdutos/DetalhesProduto.vue";
import Marketing from "src/components/Layout/Marketing.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const product = ref({});
import { useQuasar } from "quasar";
import axios from "axios";

const $q = useQuasar();

async function searchProductById (productId) {
  try {
    // ! Essa é a correta
    // product.value = await axios.get(`/api/servicoService/productBySlugEcommerceV2/${productId}/-1`);
    product.value = await axios.get("https://elevar.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/servicoService/productBySlugEcommerceV2/vestido-euphoria-011/-1");
  } catch (e) {
    //! Buscar uma ideia melhor pra esse notify (a cargo do dev-frontend)
    $q.notify({
      message: "Erro ao buscar produto, voltando..."
    });
    router.push("/");
  }
}

onMounted(async () => {
  await searchProductById(route.params.produto);
});

</script>

<template lang="pug">
q-page-container
  .row.justify-center.q-gutter-sm
    DetalhesProduto(
      :produto="product"
    )
  //- ! Marketing vai vir de api tbm?
  Marketing
</template>

<style scoped>
</style>
