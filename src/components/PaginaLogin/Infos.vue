<script setup>
import { ref, onBeforeMount } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

const $q = useQuasar();
const id = $q.localStorage.getItem("idclient");

const datacliente = ref(
  {
    celular: "85997244223",
    dataNascimento: "10012002",
    dsEmail: "caioteste@teste.com",
    endereco: {
      bairro: "",
      cep: "",
      cidade: "",
      complemento: "",
      georeferencia: {
        endereco: "",
        id: 0,
        latitude: 0,
        longitude: 0
      },
      id: 0,
      logradouro: "",
      numero: 0,
      uf: ""
    },
    foto: "",
    idCliente: 1,
    ieIsento: false,
    limiteCredito: 0,
    login: "",
    nmCliente: "Caio",
    nmRazao: "",
    nrCpfCnpj: "123.456.789-32",
    nrIe: "",
    nrTelefone: "",
    saldoAberto: 0,
    saldoVencido: 0,
    sobrenome: "Costa",
    tipo: ""
  }
);
const nome = ref("");
const cpf = ref("");
const sobrenome = ref("");
const nascimento = ref("");
const telefone = ref("");
const email = ref("");

async function searchInfos () {
  try {
    const data = await axios.get(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/clienteService/getClienteEcommerce/${id}`).then(e => e.data);
    if (data.length) {
      datacliente.value = data;
      console.log("INFORMACOES DO CLIENTE:", data);
    }
  } catch (e) {
    console.error(e);
  }
}

onBeforeMount(async () => {
  await searchInfos();
});
</script>

<template lang="pug">
div.container
  template(
    v-if="datacliente"
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
          :placeholder="datacliente.nmCliente"
        )
      div.input
        .subtitulo Sobrenome
        q-input(
          outlined
          color="black"
          v-model="sobrenome"
          :placeholder="datacliente.sobrenome"
        )
      div.input
        .subtitulo CPF
        q-input(
          outlined
          color="black"
          v-model="cpf"
          :placeholder="datacliente.nrCpfCnpj"
          disable
          style="background-color: rgba(100,100,100,0.1);"
        )
      div.input
        .subtitulo Data Nascimento*
        q-input(
          outlined
          color="black"
          v-model="nascimento"
          :placeholder="datacliente.dataNascimento"
        )
      div.input
        .subtitulo Telefone*
        q-input(
          outlined
          color="black"
          v-model="telefone"
          :placeholder="datacliente.celular"
        )
      div.input
        .subtitulo E-Mail
        q-input(
          outlined
          color="black"
          v-model="email"
          :placeholder="datacliente.dsEmail"
          disable
          style="background-color: rgba(100,100,100,0.1);"
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
