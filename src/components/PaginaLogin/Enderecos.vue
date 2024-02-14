<script setup>
import { ref } from "vue";

const nome = ref("");
const cpf = ref("");
const cep = ref("");
const endereco = ref("");
const numero = ref("");
const referencia = ref("");
const bairro = ref("");
const estado = ref("");
const cidade = ref("");

</script>

<template lang="pug">
div.container
  div.input
    .subtitulo Nome do destinatário*
    q-input(
      outlined
      color="black"
      v-model="nome"
      placeholder="Ex: João"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'campo   obrigatório']"
    )
  div.input
    .subtitulo CPF*
    q-input(
      outlined
      color="black"
      v-model="cpf"
      placeholder="Ex: 123.456.789-14"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'campo   obrigatório']"
    )
  div.input
    .subtitulo CEP*
    q-input(
      outlined
      color="black"
      v-model="cep"
      placeholder="Ex: 60700-700"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'campo   obrigatório']"
    )
  div.input
    .subtitulo Endereço*
    q-input(
      outlined
      color="black"
      v-model="endereco"
      placeholder="Ex: Rua Exemplo"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'campo   obrigatório']"
    )
  div.input
    .subtitulo Número*
    q-input(
      outlined
      color="black"
      v-model="numero"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'campo   obrigatório']"
    )
  div.input
    .subtitulo Ponto de referência
    q-input(
      outlined
      color="black"
      v-model="referencia"
    )
  div.input
    .subtitulo Bairro*
    q-input(
      outlined
      color="black"
      v-model="bairro"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'campo   obrigatório']"
    )
  div.input
    .subtitulo Estado*
    q-input(
      outlined
      color="black"
      v-model="estado"
      placeholder="Ex: CE"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'campo   obrigatório']"
    )
  div.input
    .subtitulo Cidade*
    q-input(
      outlined
      color="black"
      v-model="cidade"
      placeholder="Ex: Fortaleza"
      lazy-rules
      :rules="[ val => val && val.length > 0 || 'campo   obrigatório']"
    )
  div.input
    q-btn(
      color="black"
      push
    )
      span(
        style="color: #fff;"
      ) ENTREGAR NESSE ENDEREÇO
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.input {
  display: flex;
  margin-bottom: 15px;
  flex-direction: column;
}
.subtitulo {
  color: black;
  font-weight: 600;
  font-size: 16px;
}
</style>
