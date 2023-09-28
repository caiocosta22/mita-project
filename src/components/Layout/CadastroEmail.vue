<script setup>
</script>

<template lang="pug">
div.container.col.q-pt-md
  div.row.email.fit.col-10.q-gutter-sm.q-pa-sm
    div.texto.column.flex.text-start.col-2.q-pl-sm Cadastre-se em nossa Lista Vip <br> Fique por dentro de tudo que acontece e receba<br>novidades e ofertas exclusivas!
    q-input.col-3(standout v-model="text" label="Digite seu nome" bg-color="white" color="black" label-color="black" text="black" outlined)
    q-input.col-3(standout v-model="text" label="Digite seu e-mail" bg-color="white" color="black" label-color="black" outlined)
    q-btn.col-2.botao.q-pa-md(
      color="black" label="Cadastrar")
</template>

<style scoped>
*{
  color: black;
}
.texto{
  font-weight: bold;
  font-size:16px
}
.email{
  display:flex;
  flex-wrap:nowrap;
  justify-content:center;
  position: relative;
  box-sizing: border-box;
  align-items: center;
}

</style>
