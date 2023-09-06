<script setup>
import { ref } from "vue";
const menuList = [
  {
    label: "Minha conta",
    separator: false
  },
  {
    label: "Meus pedidos",
    separator: true
  },
  {
    label: "Viagens",
    separator: false
  },
  {
    label: "Necessaires",
    separator: false
  },
  {
    label: "Carteiras",
    separator: false
  },
  {
    label: "Home",
    separator: false
  },
  {
    label: "Office",
    separator: false
  },
  {
    label: "Masculino",
    separator: false
  },
  {
    label: "Feminino",
    separator: false
  },
  {
    label: "Utilitários",
    separator: false
  },
  {
    label: "Pacco",
    separator: false
  },
  {
    label: "Bolsas",
    separator: false
  }
];
const drawer = ref(false);
</script>

<template lang="pug">
q-btn(flat @click="drawer = !drawer" round dense icon="menu")
  .multimenu
    q-drawer(
    overlay
    v-model="drawer"
    :width="200"
    :breakpoint="500"
    elevated
    side="right"
    behavior="default"
    toggle
    )
      q-scroll-area(class="fit")
        q-list
          template(v-for="(menuItem, index) in menuList" :key="index")
            q-item(clickable :active="menuItem.label === 'Outbox'" v-ripple color="black")
              q-item-section {{ menuItem.label }}
            q-separator(:key="'sep' + index"  v-if="menuItem.separator")
</template>

<style scoped>
@media screen and (min-width: 1026px) {
  .multimenu{
    width:0px;
    height: 0px;
    display:none
  }
}
</style>
