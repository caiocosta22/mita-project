<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import axios from "axios";

import infos from "src/components/PaginaLogin/Infos.vue";
import pedidos from "src/components/PaginaLogin/Pedidos.vue";
import enderecos from "src/components/PaginaLogin/Enderecos.vue";

const router = useRouter();
const $q = useQuasar();
const id = $q.localStorage.getItem("idclient");

const show = ref("1");
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
          infos(
            :datacliente="datacliente"
          )
        template(
          v-if="show === '2'"
        )
          pedidos
        template(
          v-if="show === '3'"
        )
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
  width: 60%;
  margin-top: 20px;
}
.titulo {
  font-family: Catamaran;
  font-size: 20px;
  line-height: 1;
}
.menus {
  display: flex;
  flex-direction: column;
  margin-right: 15px;
}
@media screen and (max-width: 1150px) {
  .conteudo {
    width: 80%;
  }
  .interno {
    width: 83%;
  }
}
@media screen and (max-width: 660px) {
  .conteudo {
    width: 100%;
    margin-top: 20px;
  }
  .interno {
    width: 83%;
    flex-direction: column;
  }
  .menus{
    align-items: center;
    width: 100%;
  }
}
</style>
