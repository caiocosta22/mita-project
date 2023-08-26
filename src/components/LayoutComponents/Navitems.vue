<script setup>
</script>

<template lang="pug">
div.row.q-pa-sm.q-mt-mb-xl
  q-toolbar.col-12.q-gutter-sm.justify-evenly
    q-btn.menu( label="Viagens" unelevated)
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
    q-btn.menu( label="OFFICE" unelevated )
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
  cursor: pointer;
  font-weight: bold;
}
.menu{
  font-weight:bolder;
}
</style>
