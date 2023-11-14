<script setup>
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const router = useRouter();
const $q = useQuasar();

function redirectToLoginPage () {
  const url = "/login";
  router.push(url);
}

function redirectToHomePage () {
  const url = "/";
  router.push(url);
}

async function clearLocalStorage () {
  await $q.localStorage.clear();
  redirectToLoginPage();
}

</script>

<template lang="pug">
div.container
  div.column(
    style="margin: 0 auto; text-align:center; padding-top: 150px;padding-bottom: 150px"
  )
    p.titulo Ops! Parece que você ja está Logado.
    p Deseja deslogar ou voltar a página inicial?
    div.row.q-gutter-sm(
      style="margin: 0 auto"
    )
      q-btn(
        label="Deslogar"
        color="black"
        push
        @click="clearLocalStorage()"
      )
      q-btn(
        label="Pagina Inicial"
        color="black"
        push
        @click="redirectToHomePage"
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
