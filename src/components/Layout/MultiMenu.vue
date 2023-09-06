<script setup>
import { ref } from "vue";
const drawerVisible = ref(false);
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
// const drawer = ref(false);
</script>

<template lang="pug">
q-btn(flat round dense icon="menu" class="las la-bars" toggle @click="drawerVisible = true")
  .multimenu(class="right-drawer" :style="{width: drawerVisible? '20vw' : '0', paddingLeft: drawerVisible? '10px': '0'}")
      q-scroll-area(class="fit")
        q-list
          template(v-for="(menuItem, index) in menuList" :key="index")
            q-item(clickable :active="menuItem.label === 'Outbox'" v-ripple color="black")
              q-item-section(@click="drawerVisible = false") {{ menuItem.label }}
            q-separator(:key="'sep' + index"  v-if="menuItem.separator")
  .drawer-mask(:style="{width: drawerVisible ? '100vw' : '0',opacity: drawerVisible ? '0.6' : '0',}" @click="drawerVisible=false")
</template>

<style scoped>
.close {
  background: black;
  border: 0;
  cursor: pointer;
}
.toggle {
  width: 120px;
  background: white;
  border: 0;
  padding: 5px;
  cursor: pointer;
}
.right-drawer {
  position: absolute;
  top: -25px;
  right: -65px;
  width: 0; /* initially */
  overflow: hidden;
  height: 100vh;
  padding-left: 0; /* initially */
  background: white;
  z-index: 200;
  transition: all 0.2s;
}

.drawer-mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 0; /* initially */
  height: 100vh;
  z-index: 199;
  transition: opacity 0.2s;
}
@media screen and (min-width: 1026px) {
  .multimenu{
    width:0px;
    height: 0px;
    display:none
  }
}
</style>
