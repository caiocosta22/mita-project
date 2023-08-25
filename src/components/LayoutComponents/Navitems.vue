<script setup>
import { ref } from "vue";
const backgroundMenu = ref("rgba(0,0,0,0)");
</script>

<template lang="pug">
div.row.q-pa-sm
  q-toolbar.col-12.q-gutter-sm.justify-evenly
    q-btn.menu(label="Viagens" unelevated  :style="{ backgroundcolor: backgroundMenu }")
      q-menu
        q-list(text-color="primary" style="min-width: 100px" )
          q-item(clickable v-close-popup)
            q-item-section VIAGEM
          q-item(clickable v-close-popup)
            q-item-section VIAGEM
          q-separator
          q-item(clickable v-close-popup)
            q-item-section VIAGEM
          q-item(clickable v-close-popup)
            q-item-section VIAGEM
          q-separator
          q-item(clickable v-close-popup)
            q-item-section VIAGEM
          q-separator
    a NECESSAIRES
    a CARTEIRAS
    a HOME
    q-btn.menu(text-color="black" label="OFFICE" unelevated :style="{ backgroundcolor: backgroundMenu }")
      q-menu
        q-list(text-color="black" style="min-width: 100px" )
          q-item(clickable v-close-popup)
            q-item-section MATERIAL
          q-item(clickable v-close-popup)
            q-item-section MATERIAL
          q-item(clickable v-close-popup)
            q-item-section MATERIAL
          q-item(clickable v-close-popup)
            q-item-section MATERIAL
          q-item(clickable v-close-popup)
            q-item-section MATERIAL
          q-item(clickable v-close-popup)
            q-item-section MATERIAL
          q-item(clickable v-close-popup)
            q-item-section MATERIAL
    a MASCULINO
    a FEMININO
    a PET
    a UTILITÁRIOS
    a PACCO
    a BOLSAS
    q-input.col-3.q-pa(
    v-model="Text"
    label="O QUE ESTÁ BUSCANDO?"
    label-color="black"
    color="black"
    ).col.q-pl-xl
      template(v-slot:append)
        q-icon(name="search")
</template>
<style scoped>
a{
  color: black;
  cursor: pointer;
  font-weight: bold;
}
*{
  color: black;
}
.menu{
  font-weight:bolder;
  color:black;
}
</style>
