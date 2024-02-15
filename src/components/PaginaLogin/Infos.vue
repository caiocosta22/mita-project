<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

const $q = useQuasar();
const token = $q.localStorage.getItem("token");
const props = defineProps({
  datacliente: {
    type: Object,
    required: true,
    default: () => {}
  }
});
const cliente = computed(() => { return props.datacliente; });

const nome = ref(cliente.value.nmCliente);
const cpf = ref(cliente.value.nrCpfCnpj);
const sobrenome = ref(cliente.value.sobrenome);
const nascimento = ref(cliente.value.dataNascimento);
const telefone = ref(cliente.value.celular);
const email = ref(cliente.value.dsEmail);

const corpocliente = ref(
  {
    idCliente: cliente.value.idCliente,
    nmCliente: nome,
    sobrenome,
    dsEmail: cliente.value.dsEmail,
    nrCpfCnpj: cliente.value.nrCpfCnpj,
    dataNascimento: nascimento,
    celular: telefone,
    token
  }
);
async function updateInfos () {
  try {
    const data = await axios.post("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/clienteService/editEcommerce", corpocliente, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(e => e.data);
    console.log(data.response);
  } catch (e) {
    console.error(e);
  }
}
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
        @click="updateInfos()"
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
