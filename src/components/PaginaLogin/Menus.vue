<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const router = useRouter();
const $q = useQuasar();

const menus = ref([
  {
    menu: "Dados pessoais",
    rota: "/pessoal"
  },
  {
    menu: "Pedidos",
    rota: "/pedidos"
  },
  {
    menu: "Endereços",
    rota: "/endereco"
  }
]);

function redirectToLoginPage () {
  const url = "/login";
  router.push(url);
}

function redirectToHomePage () {
  const url = "/";
  router.push(url);
}

async function clearLocalStorage () {
  $q.localStorage.clear();
  redirectToLoginPage();
}

</script>

<template lang="pug">
div.container
  div.interno
    div.menus
      div.titulo
        p(style="margin: 0;") MINHA CONTA
        q-separator(
          style="width: 150px;height: 2px; margin-bottom: 15px; margin-top: 15px;"
          color="black"
        )
      div.subtitulos(
        v-for="menu in menus"
        :key="menu"
      )
        q-btn.menu(
          :to="menu.rota"
          style="width: 150px;margin-bottom: 10px; text-align: left;"
          push
        )
          span(
            style="text-align: left;"
          ) {{ menu.menu }}
      q-btn(
        label="Deslogar"
        color="black"
        push
        @click="clearLocalStorage()"
        style="width: 150px;margin-bottom: 10px; text-align: left;"
      )
      q-btn(
        label="Pagina Inicial"
        color="black"
        push
        @click="redirectToHomePage"
        style="width: 150px;margin-bottom: 10px; text-align: left;"
      )
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.titulo {
  font-family: Catamaran;
  font-size: 20px;
  line-height: 1;
}
.menus {
  display: flex;
  flex-direction: column;
}
</style>
