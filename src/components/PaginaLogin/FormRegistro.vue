<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const $q = useQuasar();

const email = ref(null);
const password = ref(null);
const accept = ref(false);

function onSubmit () {
  if (accept.value !== true) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first"
    });
  } else {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Submitted"
    });
  }
}
function redirectToRegisterPage () {
  const url = "/registro";
  router.push(url);
}

function onReset () {
  email.value = null;
  password.value = null;
  accept.value = false;
}
</script>

<template lang="pug">
div.container
    .q-form.q-gutter-md.containerlogin.q-pa-md(
        @submit="onSubmit"
        @reset="onReset"
    )
        .titulo CRIAR CONTA
        div.row.flex.q-gutter-sm(style="max-width:100%")
            div.column
                .primario Nome
                q-input(
                    outlined
                    v-model="nome"
                    placeholder="Ex: João"
                )
            div.column
                .primario Sobrenome
                q-input(
                    outlined
                    v-model="sobrenome"
                    placeholder="Ex: Silva"
                )
            div.column
                .primario Email
                q-input(
                outlined
                v-model="email"
                placeholder="Ex: email@email.com"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'E-mail obrigatório']"
            )
        div.row.flex.q-gutter-sm(style="max-width:100%")
            div.column
                .primario CPF
                q-input(
                    outlined
                    v-model="sobrenome"
                    placeholder="Ex: 123.456.789-14"
                )
            div.column
                .primario Data Nascimento
                q-input(
                    outlined
                    v-model="sobrenome"
                    placeholder="Ex: 00/00/0000"
                )
        div.row.flex.q-gutter-sm(style="max-width: 100%;")
            div.column
                .primario Telefone
                q-input(
                    outlined
                    v-model="sobrenome"
                    placeholder="Ex: (99)99999-9999"
                )
        div.row.flex.q-gutter-sm(style="max-width:100%")
            div.column
                .primario Senha
                q-input(
                    outlined
                    type="password"
                    v-model="password"
                    label="Digite sua senha"
                    lazy-rules
                    label-color="black"
                    :rules="[ val => val && val.length > 0 || 'Por favor digite sua senha']"
                )
            div.column
                .primario Confirme a senha
                q-input(
                    outlined
                    type="password"
                    v-model="password"
                    label="Digite sua senha"
                    lazy-rules
                    label-color="black"
                    :rules="[ val => val && val.length > 0 || 'Por favor digite sua senha']"
                )
        a.esqueceu.cursor-pointer Já tem uma conta? Faça login!
        div
            q-btn(
                label="REGISTRAR"
                type="submit"
                color="black"
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
}
.containerlogin{
    margin: 0 auto;
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    width: 60%;
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
  font-size: 24px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
}
.esqueceu {
    color: #939598;
  font-family: Catamaran;
  font-size: 14px;
  font-weight: 300;
  text-decoration-line: underline;;
}
</style>
