<script setup>
import { ref } from "vue";

const viagensMenuOpen = ref(false);
const officeMenuOpen = ref(false);
const Text = ref("");

function openMenu (menuName) {
  if (menuName === "viagens") {
    viagensMenuOpen.value = true;
    officeMenuOpen.value = false;
  } else if (menuName === "office") {
    viagensMenuOpen.value = false;
    officeMenuOpen.value = true;
  }
}

function closeMenu (menuName) {
  if (menuName === "viagens") {
    viagensMenuOpen.value = false;
  } else if (menuName === "office") {
    officeMenuOpen.value = false;
  }
}
</script>

<template lang="pug">
div.row.q-pa-sm.q-mt-mb-xl
  q-toolbar.col-12.q-gutter-sm.justify-evenly
    q-btn.menu( label="Viagens" unelevated @mouseover="openMenu('viagens')")
      q-menu(ref="viagensMenu" v-model="viagensMenuOpen")
        q-list(style="min-width: 100px")
          q-item(clickable @click="closeMenu('viagens')")
            q-item-section VIAGEM
          q-item(clickable @click="closeMenu('viagens')")
            q-item-section VIAGEM
          q-separator
          q-item(clickable @click="closeMenu('viagens')")
            q-item-section VIAGEM
          q-item(clickable @click="closeMenu('viagens')")
            q-item-section VIAGEM
          q-separator
          q-item(clickable @click="closeMenu('viagens')")
            q-item-section VIAGEM
          q-separator
    a NECESSAIRES
    a CARTEIRAS
    a HOME
    q-btn.menu( label="OFFICE" unelevated @mouseover="openMenu('office')")
      q-menu(ref="officeMenu" v-model="officeMenuOpen")
        q-list(style="min-width: 100px")
          q-item(clickable @click="closeMenu('office')")
            q-item-section MATERIAL
          q-item(clickable @click="closeMenu('office')")
            q-item-section MATERIAL
          q-item(clickable @click="closeMenu('office')")
            q-item-section MATERIAL
          q-item(clickable @click="closeMenu('office')")
            q-item-section MATERIAL
          q-item(clickable @click="closeMenu('office')")
            q-item-section MATERIAL
          q-item(clickable @click="closeMenu('office')")
            q-item-section MATERIAL
          q-item(clickable @click="closeMenu('office')")
            q-item-section MATERIAL
    a MASCULINO
    a FEMININO
    a PET
    a UTILITÁRIOS
    a PACCO
    a BOLSAS
    q-input.col-3.q-pa(
    v-model="Text"
    label=""
    label-color="black"
    color="black"
    ).col.q-pl-xl
      template(v-slot:append)
        q-icon(name="search")
</template>
<style scoped>
a{
  cursor: pointer;
  font-weight: bold;
}
.menu{
  font-weight:bolder;
}

</style>
