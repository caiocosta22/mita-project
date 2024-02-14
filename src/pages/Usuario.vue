<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import infos from "src/components/PaginaLogin/Infos.vue";
import pedidos from "src/components/PaginaLogin/Pedidos.vue";
import enderecos from "src/components/PaginaLogin/Enderecos.vue";
const router = useRouter();
const $q = useQuasar();
const show = ref("1");
const menus = ref([
  {
    menu: "Dados pessoais",
    id: "1"
  },
  {
    menu: "Pedidos",
    id: "2"
  },
  {
    menu: "Endereços",
    id: "3"
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
q-page-container
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
            style="width: 150px;margin-bottom: 10px; text-align: left;"
            push
            @click="show=menu.id"
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
      div.conteudo
        template(
          v-if="show === '1'"
        )
          infos
        template(
          v-if="show === '2'"
        )
          div.teste
            pedidos
        template(
          v-if="show === '3'"
        )
          div.teste
            enderecos
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.interno {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
