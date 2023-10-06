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
        .titulo Faça seu Login
        div.column
          .primario Email
          q-input(
              outlined
              v-model="email"
              label="Digite seu email"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'E-mail obrigatório']"
          )
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
          a.esqueceu.cursor-pointer Esqueceu sua senha?
        div.botoes
            q-btn(
                label="Login"
                type="submit"
                color="black"
            )
            q-btn.botaoregistro(
                label="Registre-se"
                color="black"
                label-color="black"
                class="q-ml-sm"
                @click="redirectToRegisterPage()"
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
    width: 30%;;
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
@media screen and (max-width: 1150px) {
  .containerlogin{
    width: 50%;
  }
}
@media screen and (max-width: 789px) {
  .botoes{
    display:flex;
    flex-direction:column;
  }
  .botaoregistro{
    margin: 0;
    margin-top: 15px
  }

}
@media screen and (max-width: 460px){
  .titulo{
    font-size:22px
  }
  .primario{
    font-size: 18px;
  }
}
</style>
