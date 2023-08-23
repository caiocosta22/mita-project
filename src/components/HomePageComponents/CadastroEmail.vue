<script setup>
</script>

<template lang="pug">
div.q-pa-lg.row.justify-center.q-gutter-md(style="background-color: white; display:flex;align-items: center; flex-wrap: wrap;")
  div.texto.col-3
    p.text-black Cadastre-se em nossa Lista Vip<br>Fique por dentro de tudo que acontece e receba<br>novidades e ofertas exclusivas!
  q-input(standout v-model="text" label="Digite seu nome" bg-color="white" color="black" label-color="black" text="black" outlined ).col-3
  q-input(standout v-model="text" label="Digite seu e-mail" bg-color="white" color="black" label-color="black" outlined).col-3
  q-btn.q-pa-md(label="Cadastrar" color = "black" style="width: 180px;" text-color="white").col-3
</template>

<style scoped>
.texto p{
  color: #FFF;
font-size: 22px;
font-style: normal;
font-weight: 400;
line-height: 22px; /* 110% */
}
</style>
