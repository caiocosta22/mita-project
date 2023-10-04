<script setup>
import { ref, computed, onBeforeMount, onMounted, onBeforeUnmount } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";

const router = useRouter();
const route = useRoute();

const productTyped = ref("");
//  const productsSearched = ref([]);
const itsLoading = ref(true);
const cor = ref("black");
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

function MudarCores () {
  if (route.path === "/") {
    cor.value = "white";
  } else {
    cor.value = "black";
  }
}

const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const opacityThreshold = 0;

  if (scrollPosition > opacityThreshold) {
    cor.value = "black";
  } else {
    cor.value = "white";
  }
};

onBeforeMount(async () => {
  itsLoading.value = true;
  await searchCategories();
  MudarCores();
  itsLoading.value = false;
});

onMounted(() => {
  if (route.path === "/") {
    window.addEventListener("scroll", handleScroll);
  }
});

onBeforeUnmount(() => {
  if (route.path === "/") {
    window.removeEventListener("scroll", handleScroll);
  }
});

</script>

<template lang="pug">
.containernav.col.row.q-pt-sm(
  v-show="!itsLoading"
)
  q-toolbar.nav.q-px-md
    div.row.col.justify-evenly
      template(
        v-for="categorie in categoriesBase"
        :key="categorie.name"
      )
        p.cursor-pointer.row(
          @click="openCategoryPage(categorie)"
          style=" font-size: 12px;"
          :color="cor"
        ) {{ categorie.name }}
        div.col
    div.col-2.row
      q-input.text-black.busca.q-pb-md.col-12(
        v-model="productTyped"
        type="search"
        label
        dense
        :color="cor"
        @keypress.enter="redirectToSearchPage()"
        ref="inputRef"
      )
        template(v-slot:label)
          .textobusca(
            :style="correctStyle"
            :color="cor"
        )  O QUE ESTÁ BUSCANDO
        template(v-slot:append)
          q-icon(
            size="sm"
            @click="redirectToSearchPage()"
            :color="cor"
            name="search"
            style="transition: 1s; cursor:pointer"
          )
</template>
<style scoped>
a{
  cursor: pointer;
  font-weight: bold;
}
.menu{
  font-weight:bolder;
}
.textobusca{
  transition: 1s;
  font-size:12px;
}
.nav{
  display: flex;
  flex-direction: row;
  flex-shrink: 1;
  flex-grow: 1;
  max-width: 85%;
  margin: 0 auto
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
