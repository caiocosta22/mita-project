<script setup>
</script>

<template lang="pug">
div.container.col.q-pt-md
  div.row.email.fit.col-10.q-gutter-sm.q-pa-sm
    div.texto.col-3.q-pl-sm
      span.titulo(style="color: #000;font-size: 24px;font-weight: 400;") Cadastre-se em nossa Lista Vip
      span.subtexto(style="color: #000;font-size: 18px;font-weight: 300;") Fique por dentro de tudo que acontece e receba novidades e ofertas exclusivas!
    q-input.nomeinput.col-2(standout v-model="text" label="Digite seu nome" bg-color="white" color="black" label-color="black" text="black" outlined)
    q-input.emailinput.col-3(standout v-model="text" label="Digite seu e-mail" bg-color="white" color="black" label-color="black" outlined)
    q-btn.col-2.botao.q-pa-md(
      color="black" label="Cadastrar")
</template>

<style scoped>
*{
  color: black;
}
.texto{
  text-align:left;
  display: flex;
  flex-direction: column;
}
.email{
  display:flex;
  flex-wrap:nowrap;
  justify-content:center;
  position: relative;
  box-sizing: border-box;
  align-items: center;
}
@media screen and (max-width: 1024px) {
.email{
  display: flex;
  flex-direction: column;
}
.email>div{
  width: 85%;
}
.nomeinput{
  width: 85%;
}
.emailinput{
  width: 85%;
}
.botao{
  width: 85%;
}
}

</style>
