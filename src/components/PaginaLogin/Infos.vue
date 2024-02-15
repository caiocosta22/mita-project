<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  datacliente: {
    type: Object,
    required: true,
    default: () => {}
  }
});

const cliente = computed(() => { return props.datacliente; });

const nome = ref("");
const cpf = ref("");
const sobrenome = ref("");
const nascimento = ref("");
const telefone = ref("");
const email = ref("");

</script>

<template lang="pug">
div.container
  template(
    v-if="cliente"
  )
    div.interno
      span.subtitulo(
        style="font-size: 24px; margin-left: 15px;"
      ) Dados Pessoais
    div.interno
      div.input
        .subtitulo Nome
        q-input(
          outlined
          color="black"
          v-model="nome"
          :placeholder="cliente.nmCliente"
        )
      div.input
        .subtitulo Sobrenome
        q-input(
          outlined
          color="black"
          v-model="sobrenome"
          :placeholder="cliente.sobrenome"
        )
      div.input
        .subtitulo CPF
        q-input(
          outlined
          color="black"
          v-model="cpf"
          :placeholder="cliente.nrCpfCnpj"
          disable
          style="background-color: rgba(100,100,100,0.1);"
        )
      div.input
        .subtitulo Data Nascimento*
        q-input(
          outlined
          color="black"
          v-model="nascimento"
          :placeholder="cliente.dataNascimento"
        )
      div.input
        .subtitulo Telefone*
        q-input(
          outlined
          color="black"
          v-model="telefone"
          :placeholder="cliente.celular"
        )
      div.input
        .subtitulo E-Mail
        q-input(
          outlined
          color="black"
          v-model="email"
          :placeholder="cliente.dsEmail"
          disable
          style="background-color: rgba(100,100,100,0.1);"
        )
    div.input
      q-btn(
        color="green"
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
  margin-bottom: 30px;
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
