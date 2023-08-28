<script setup>
</script>

<template lang="pug">
div.q-pa-lg.row.justify-center.q-gutter-md(style="background-color: white; display:flex;align-items: center; flex-wrap: nowrap;")
  div.q-mr-xl(width="449px")
    p.text-black.texto1 Cadastre-se em nossa Lista Vip
    p.text-black.texto2 Fique por dentro de tudo que acontece e receba<br>novidades e ofertas exclusivas!
  q-input(standout v-model="text" label="Digite seu nome" bg-color="white" color="black" label-color="black" text="black" outlined style="width:323px; heigth:28px"  )
  q-input(standout v-model="text" label="Digite seu e-mail" bg-color="white" color="black" label-color="black" outlined style="width:323px; heigth:28px" )
  q-btn.botao.q-pa-md(
    color="black" label="Cadastrar" style="width: 225.2px; height:56px")
</template>

<style scoped>
.texto1 {
  color: #FFF;
font-size: 22px;
font-style: normal;
font-weight: bold;
line-height: 22px; /* 110% */
}
.texto2{
  color: black;
  font-size: 18px;
  font-style: normal;
  font-weight: 300px;
  line-height: 22px; /* 110% */
}
*{
  color: black;
}
</style>
