<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();

const productTyped = ref("");
const productsSearched = ref([]);
const itsLoading = ref(true);
const categoriesBase = ref([
  {
    name: "VIAGENS",
    children: [
      { name: "VIAGEM 1", children: [] },
      { name: "VIAGEM 2", children: [] },
      { name: "VIAGEM 3", children: [] },
      { name: "VIAGEM 4", children: [] },
      { name: "VIAGEM 5", children: [] }
    ]
  },
  {
    name: "OFFICE",
    children: [
      { name: "MATERIAL 1", children: [] },
      { name: "MATERIAL 2", children: [] },
      { name: "MATERIAL 3", children: [] },
      { name: "MATERIAL 4", children: [] },
      { name: "MATERIAL 5", children: [] }
    ]
  },
  { name: "NECESSAIRES", children: [] },
  { name: "CARTEIRAS", children: [] },
  { name: "HOME", children: [] },
  { name: "MASCULINO", children: [] },
  { name: "FEMININO", children: [] },
  { name: "PET", children: [] },
  { name: "UTILITÁRIOS", children: [] },
  { name: "PACCO", children: [] },
  { name: "BOLSAS", children: [] }
]);

const props = defineProps({
  dynamicStyle: {
    type: Object,
    // eslint-disable-next-line no-labels, no-unused-expressions
    default: () => {}
  }
});

const correctStyle = computed(() => {
  if (props.dynamicStyle) return props.dynamicStyle;
  return { color: "" };
});

function redirectToSearchPage () {
  if (productTyped.value) {
    const url = "/pesquisa/" + productTyped.value;
    router.push(url);
  }
}

const backgroundsearchColor = ref("rgba(0,0,0,0)");

async function searchCategories () {
  try {
    const data = await axios.get("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/ecommerce/categoriaAutoRelacionada/getAllCategorias").then(e => e.data);
    if (data.length) {
      categoriesBase.value = data.map(row => {
        return { ...row, name: row.descricao, children: [...row.subCategoria], foto: row.fotoUrl };
      });
      categoriesBase.value = categoriesBase.value.filter(row => row.name !== "MEIO SITE");
    }
  } catch (e) {
    console.error(e);
  }
}

async function openCategoryPage (category) {
  if (category.id) {
    const url = "/categorias/" + category.id;
    await router.push(url);
    window.location.reload();
  }
}

onBeforeMount(async () => {
  itsLoading.value = true;
  await searchCategories();
  itsLoading.value = false;
});

</script>

<template lang="pug">
.containernav.col.row.q-pt-sm(
  v-show="!itsLoading"
)
  q-toolbar.col-10.row.q-mr-md
    div.row.col.justify-evenly.col-8
      template(
        v-for="categorie in categoriesBase"
        :key="categorie.name"
      )
        p.text-bold.cursor-pointer.row(
          @click="openCategoryPage(categorie)"
          style=" font-size: 14px;"
        ) {{ categorie.name }}
        div.col
    div.col-5.row
      q-input.text-black.busca.q-pb-md.col-9(
        v-model="productTyped"
        type="search"
        label
        debounce="500"
        color="black"
        @keypress.enter="redirectToSearchPage()"
        :bg-color="backgroundsearchColor"
        ref="inputRef"
      )
        template(v-slot:label)
          .text-bold.textobusca(
            :style="correctStyle"
        )  O QUE ESTÁ BUSCANDO
        template(v-slot:append)
          q-icon(
            size="md"
            @click="redirectToSearchPage()"
            :color="!!correctStyle.color && correctStyle.color === 'rgba(0,0,0,1)' ? 'black' : 'white'"
            name="search"
            style="transition: 1s;"
          )
</template>
<style scoped>
a{
  cursor: pointer;
  font-weight: bold;
}
p{
  font-size: 14px;
}
.menu{
  font-weight:bolder;
}
.textobusca{
  transition: 1s;
}
.containernav{
  display:flex;
  flex-wrap:nowrap;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  align-items: center;
  text-align: center;
}
@media screen and (max-width: 1150px) {
  .nav{
    display: none;
  }
}
</style>
