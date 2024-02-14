<script setup>
import { ref } from "vue";

const nome = ref("");
const cpf = ref("");
const sobrenome = ref("");
const nascimento = ref("");
const telefone = ref("");
const email = ref("");

</script>

<template lang="pug">
div.container
  div.interno
    div.input
      .subtitulo Nome
      q-input(
        outlined
        color="black"
        v-model="nome"
        placeholder="Ex: João"
      )
    div.input
      .subtitulo Sobrenome
      q-input(
        outlined
        color="black"
        v-model="sobrenome"
        placeholder="Ex: Da silva"
      )
    div.input
      .subtitulo CPF
      q-input(
        outlined
        color="black"
        v-model="cpf"
        placeholder="Ex: 60700-700"
      )
    div.input
      .subtitulo Data Nascimento*
      q-input(
        outlined
        color="black"
        v-model="nascimento"
        placeholder="Ex: 01/01/1990"
      )
    div.input
      .subtitulo Telefone*
      q-input(
        outlined
        color="black"
        v-model="telefone"
        placeholder="Ex: (85)91111-1111"
      )
    div.input
      .subtitulo E-Mail
      q-input(
        outlined
        color="black"
        v-model="email"
      )
  div.input
    q-btn(
      color="black"
      push
    )
      span(
        style="color: #fff;"
      ) SALVAR
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.interno {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.input {
  display: flex;
  margin-bottom: 35px;
  flex-direction: column;
  width: 45%;
  margin-left: 15px;
}
.subtitulo {
  color: black;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 5px;
}
@media screen and (max-width: 1150px) {
  .interno {
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
}
.input {
  width: 100%;
  margin-left: 15px;
}
}
</style>
