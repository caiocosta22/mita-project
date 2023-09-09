<script setup>
import { ref, computed, onBeforeMount, onMounted, onUnmounted } from "vue";
import axios from "axios";

const showMenu = ref(false);
const showThisMenu = ref("VIAGENS");

const productTyped = ref("");
const productsSearched = ref([]);
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

function openMenu (name) {
  showMenu.value = true;
  showThisMenu.value = name;
}

function closeMenu (name) {
  showMenu.value = false;
  showThisMenu.value = "";
}

async function searchProducts () {
  try {
    let data = [];
    if (productTyped.value) {
      // ? Aqui é o local para implementar uma lógica de loading (para criar um loading caso queira mostrar uma tabelinha para o cliente enquanto retorna os produtos)
      // ? Recomendo utilizar uma ref e setar como true e no final da função setar como false (dica: utilizar o finally do try catch finally, pesquisar sobre!)
      data = await axios.get(`/api/servicoService/filtroBuscaV2/${productTyped.value}/-1/1/false/-1`).then(e => e.data);
    }
    if (data.content && data.content.length) productsSearched.value = data.content;
  } catch (e) {
    // ? Caso queira mostrar um erro para o usuario utilizar o quasar notify ($q.notify)
    // ? exemplo -> import { useQuasar } from "quasar"; const $q = useQuasar(); $q.notify() -> pesquisar sobre!
    console.error(e);
  }
}
const backgroundsearchColor = ref("rgba(0,0,0,0)");
const changeBackgroundColor = () => {
  // Alterar a cor de fundo para branco quando clicado
  backgroundsearchColor.value = "white";
};
const inputRef = ref(null);
onMounted(() => {
  // Adicionar um ouvinte de evento de clique global
  document.addEventListener("click", handleGlobalClick);
});
const handleGlobalClick = (event) => {
  // Verificar se o clique foi fora do componente
  if (!inputRef.value.contains(event.target)) {
    // Clique fora do componente, restaurar a cor de fundo original
    backgroundsearchColor.value = "rgba(0,0,0,0)";
  }
};
// Remover o ouvinte de evento quando o componente for destruído
onUnmounted(() => {
  document.removeEventListener("click", handleGlobalClick);
});

async function searchCategories () {
  try {
    const data = await axios.get("/api/ecommerce/categoriaAutoRelacionada/getAllCategorias").then(e => e.data);
    if (data.length) {
      categoriesBase.value = data.map(row => {
        return { name: row.descricao, children: [...row.subCategoria], foto: row.fotoUrl };
      });
    }
  } catch (e) {
    console.error(e);
  }
}

onBeforeMount(async () => {
  await searchCategories();
});
</script>

<template lang="pug">
div.row.q-pa-sm.q-mt-mb-xl
  q-toolbar.col-12.q-gutter-sm.justify-evenly
    template(
      v-for="categorie in categoriesBase"
      :key="categorie.name"
    )
      template(
        v-if="categorie.children?.length"
      )
        p.text-bold.cursor-pointer(
          unelevated
          @mouseover="openMenu(categorie.name)"
        ) {{ categorie.name }}
          template(
            v-if="categorie.name == showThisMenu"
          )
            q-menu.cursor-pointer(
              v-model="showMenu"
              @mouseleave="closeMenu(categorie.name)"
            )
              q-list(style="min-width: 100px")
                template(
                  v-for="child in categorie.children"
                  :key="child.name"
                )
                  q-item
                    q-item-section {{ child.name }}
                  q-separator
      template(
        v-else
      )
        p.text-bold {{ categorie.name }}
    q-input.col-3.text-black(
      v-model="productTyped"
      type="search"
      label
      debounce="500"
      color="black"
      :bg-color="backgroundsearchColor"
      @update:model-value="searchProducts()"
      @click="changeBackgroundColor"
      ref="inputRef"
    )
      template(v-slot:label)
        p.text-bold.oquebusca(
          :style="correctStyle"
        ) O QUE ESTÁ BUSCANDO
      template(v-slot:append)
        q-icon(
          size="md"
          :color="!!correctStyle.color && correctStyle.color === 'rgba(0,0,0,1)' ? 'black' : 'grey'"
          name="search"
          style="transition: 1s;"
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
.oquebusca{
  transition: 1s;
}
</style>
