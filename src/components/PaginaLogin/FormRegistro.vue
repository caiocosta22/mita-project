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
        .titulo.q-pl-sm CRIAR CONTA
        div.row.flex.q-gutter-sm.nomesobrenome
            div.column.nome
                .primario Nome
                q-input(
                    outlined
                    v-model="nome"
                    placeholder="Ex: João"
                )
            div.column.nome
                .primario Sobrenome
                q-input(
                    outlined
                    v-model="sobrenome"
                    placeholder="Ex: Silva"
                )
            div.column.mediainput
                .primario Email
                q-input(
                outlined
                v-model="email"
                placeholder="Ex: email@email.com"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'E-mail obrigatório']"
            )
        div.row.flex.q-gutter-sm.mediacontainer
            div.column.mediainput
                .primario CPF
                q-input(
                    outlined
                    v-model="CPF"
                    placeholder="Ex: 123.456.789-14"
                )
            div.column.mediainput
                .primario.mediainput Data Nascimento
                q-input(
                    outlined
                    v-model="nascimento"
                    placeholder="Ex: 00/00/0000"
                )
        div.row.flex.q-gutter-sm.mediacontainer
            div.column.mediainput
                .primario Telefone
                q-input(
                    outlined
                    v-model="telefone"
                    placeholder="Ex: (99)99999-9999"
                )
        div.row.flex.q-gutter-sm.mediacontainer
            div.column.mediainput
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
            div.column.mediainput
                .primario Confirme a senha
                q-input(
                    outlined
                    type="password"
                    v-model="confirmpassword"
                    label="Confirme sua senha"
                    lazy-rules
                    label-color="black"
                    :rules="[ val => val && val.length > 0 || 'Por favor digite sua senha']"
                )
            a.esqueceu.cursor-pointer Já tem uma conta? Faça login!
        div.q-pl-sm
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
    margin: 0 auto;

}
.containerlogin{
    margin: 0 auto;
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
.nome{
    width:24%;
}
.mediainput{
    width: 49%;
}
@media screen and (max-width: 1150px) {
    .mediacontainer{
        display:flex;
        flex-direction: column;
    }
    .nome{
        width:60%;
    }
    .mediainput{
        width:60%;
    }
    .containerlogin{
        width: 65%;
    }
}
@media screen and (max-width: 789px) {
    .titulo{
    font-size:22px
  }
  .primario{
    font-size: 18px;
  }
}
</style>
