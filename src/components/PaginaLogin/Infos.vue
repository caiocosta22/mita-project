<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const $q = useQuasar();
const nomeref = ref("");
const sobrenomeref = ref("");
const dsEmail = ref("");
const cpf = ref("");
const data = ref("");
const telefone = ref("");
const senharef = ref(null);
const pf = ref("pf");
const envioregistro = async () => {
  try {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "refresh",
      message: "Iniciando registro, aguarde um pouco"
    });
    const response = await axios.post("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/clienteService/salvaEcommerce",
      {
        nmCliente: nomeref.value,
        sobrenome: sobrenomeref.value,
        login: dsEmail.value,
        dsEmail: dsEmail.value,
        nrCpfCnpj: cpf.value,
        dataNascimento: data.value,
        nrTelefone: telefone.value,
        celular: telefone.value,
        senha: senharef.value,
        pf: pf.value
      }
    );
    if (response.status === 200) {
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Registro concluído com sucesso!"
      });
    } if (response.status === 500) {
      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: "Ocorreu um erro! Tente novamente."
      });
    }
  } catch (error) {
    console.log(error);
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Ocorreu um erro! Tente novamente."
    });
  }
};

</script>

<template lang="pug">
div.container
  .containerlogin
    div.row.flex.q-gutter-sm.media
      div.column.campo
        .primario Nome
        q-input(
          outlined
          color="black"
          v-model="nomeref"
          placeholder="Ex: João"
        )
      div.column.campo
        .primario Sobrenome
        q-input(
          outlined
          color="black"
          v-model="sobrenomeref"
          placeholder="Ex: Silva"
        )
    div.row.flex.q-gutter-sm.media.q-pt-md
      div.column.campo
        .primario Email
        q-input(
          outlined
          color="black"
          v-model="dsEmail"
          placeholder="Ex: email@email.com"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'E-mail   obrigatório']"
        )
        .primario CPF
        q-input(
          outlined
          color="black"
          v-model="cpf"
          mask="###.###.###-##"
          placeholder="Ex: 123.456.789-14"
        )
    div.row.flex.q-gutter-sm.media.q-pt-md
      div.column.campo
        .primario Data Nascimento
        q-input(
            outlined
            color="black"
            v-model="data"
            mask="##/##/####"
            placeholder="Ex: 00/00/0000"
        )
      div.column.campo
        .primario Telefone
        q-input(
            outlined
            color="black"
            v-model="telefone"
            mask="###########"
            placeholder="Ex: (99)99999-9999"
        )
</template>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
    align-items: center;
    margin-bottom: 40px;
    margin: 0 auto;

}
.containerlogin{
  justify-content: center;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  width: 50%;
}
.titulo{
  color: #000;
  text-align: left;
  font-family: Catamaran;
  font-size: 30px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
}
.primario{
  color: #000;
  text-align: left;
  font-family: Catamaran;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
}
.campo {
  width: 50%;
}
.media {
  flex-wrap: nowrap;
  display: flex;
}
@media screen and (max-width: 1150px) {
  .containerlogin{
    width: 87%;
  }
  .media {
  flex-direction: column;
  display: flex;;
  }
  .campo {
    width: 100%;
  }
  .primario{
    font-size: 18px;
  }
}
</style>
