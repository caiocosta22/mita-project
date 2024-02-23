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

const formatarData = (data) => {
  if (!data) return "";

  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
};

const nome = ref(cliente.value.nmCliente);
const cpf = ref(cliente.value.nrCpfCnpj);
const sobrenome = ref(cliente.value.sobrenome);
const nascimento = ref(formatarData(cliente.value.dataNascimento));
const telefone = ref(formatarTelefone(cliente.value.celular));
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

function formatarTelefone (numero) {
  let numeroLimpo = numero.replace(/\D/g, "");

  if (numeroLimpo.startsWith("55") && numeroLimpo.length === 13) {
    numeroLimpo = numeroLimpo.substring(2);
  }

  if (numeroLimpo.length === 11) {
    return numeroLimpo.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else {
    return "Número de telefone inválido";
  }
}

async function updateInfos () {
  try {
    const data = await axios.post("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/clienteService/editEcommerce", corpocliente.value, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (data.status === 200) {
      $q.notify({
        color: "green",
        textColor: "white",
        icon: "check",
        message: "Informações atualizadas com sucesso! atualizando a página."
      });
      location.reload();
      console.log("ENDERECO ENVIADO");
    } else {
      $q.notify({
        color: "red",
        textColor: "white",
        icon: "alert",
        message: "Erro ao atualizar informações, tente recarregar a página ou verificar suas informações."
      });
    }
  } catch (e) {
    console.error(e);
  }
}
</script>

<template lang="pug">
div.container
  template(
    v-if="!itsLoading"
  )
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
            mask="###.###.###-##"
            style="background-color: rgba(100,100,100,0.1);"
          )
        div.input
          .subtitulo Data Nascimento*
          q-input(
            outlined
            color="black"
            v-model="nascimento"
            type="date"
          )
        div.input
          .subtitulo Telefone*
          q-input(
            outlined
            color="black"
            v-model="telefone"
            mask="(##)#####-####"
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
