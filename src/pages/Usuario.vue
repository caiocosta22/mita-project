<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import axios from "axios";

import infos from "src/components/PaginaLogin/Infos.vue";
import pedidos from "src/components/PaginaLogin/Pedidos.vue";
import enderecos from "src/components/PaginaLogin/Enderecos.vue";
import pagamentos from "src/components/PaginaLogin/Pagamentos.vue";

const router = useRouter();
const $q = useQuasar();
const id = $q.localStorage.getItem("idclient");
const token = $q.localStorage.getItem("token");

const notification = ref(null);
const itsLoading = ref(true);
const show = ref("1");
const datacliente = ref(
  {
    celular: "85997244223",
    dataNascimento: "10/01/2002",
    dsEmail: "caioteste@teste.com",
    endereco: {
      bairro: "teste1",
      cep: "60710702",
      cidade: "teste2",
      complemento: "teste3",
      georeferencia: {
        endereco: "",
        id: 0,
        latitude: 0,
        longitude: 0
      },
      id: 0,
      logradouro: "teste4",
      numero: 2,
      uf: "ce"
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
const dataorder = ref("");
const dataaddress = ref("");
const datapayment = ref("");
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
  },
  {
    menu: "Pagamentos",
    id: "4"
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
    const data = await axios.get(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/clienteService/getClienteEcommerce/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(e => e.data);
    datacliente.value = data;
    console.log("INFORMACOES DO CLIENTE:", data);
  } catch (e) {
    console.error(e);
  }
}

async function searchAddress () {
  try {
    const data = await axios.get(`https://mitaoficial.elevarloja.com.br/api/clienteEnderecoService/all/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(e => e.data);
    dataaddress.value = data;
    console.log("INFORMACOES DO ENDERECO:", data);
  } catch (e) {
    console.error(e);
  }
}

async function searchOrders () {
  try {
    const data = await axios.get(`https://mitaoficial.elevarloja.com.br/api/ecommerce/agendamentoExternoService/historyPedido/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(e => e.data);
    dataorder.value = data;
    console.log("INFORMACOES DOS PEDIDOS:", data);
  } catch (e) {
    console.error(e);
  }
}

async function searcPayments () {
  try {
    const data = await axios.post("https://mitaoficial.elevarcommerce.com.br/api/portal/ecommerce/cartaoService/allSite", { idCliente: id }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(e => e.data);
    datapayment.value = data;
    console.log("INFORMACOES DOS CARTOES:", data.response);
  } catch (e) {
    console.error(e);
  }
}

onBeforeMount(async () => {
  itsLoading.value = true;
  await Promise.all([
    searchInfos(),
    searchAddress(),
    searchOrders(),
    searcPayments()
  ]);
  itsLoading.value = false;
});

console.log(token);
</script>

<template lang="pug">
q-page-container
  div.container
    template(
      v-if="!itsLoading"
    )
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
            v-if="itsLoading"
          )
            q-skeleton(
              width="100px"
              height="900px"
            )
          template(
            v-if="!itsLoading"
          )
            template(
              v-if="show === '1'"
            )
              infos(
                :datacliente="datacliente"
              )
            template(
              v-if="show === '2'"
            )
              pedidos(
                :dataorder="dataorder"
              )
            template(
              v-if="show === '3'"
            )
              enderecos(
                :dataaddress="dataaddress"
              )
            template(
              v-if="show === '4'"
            )
              pagamentos(
                :datapayment="datapayment"
              )
    template(
      v-if="itsLoading"
    )
      div.interno
        div.menus
          div.titulo
            p(style="margin: 0;") MINHA CONTA
            q-separator(
              style="width: 150px;height: 2px; margin-bottom: 15px; margin-top: 15px;"
              color="black"
            )
          div.subtitulos(
            v-for="index in 6"
            :key="index"
          )
            q-skeleton.q-mb-sm(
              width="150px"
              height="45px"
            )
        div.conteudo
          q-skeleton.q-mb-sm.skeleton
</template>

<style scoped>
.skeleton {
  height: 400px;
  width: 700px;
}
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.interno {
  display: flex;
  flex-direction: row;
  width: 83%;
  margin-top: 20px;
  margin-bottom: 20vh;
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
  .skeleton {
    width: 500px;
  }
}
@media screen and (max-width: 769px) {
  .conteudo {
    width: 100%;
    margin-top: 20px;
  }
  .skeleton {
    width: 100%;
  }
  .interno {
    width: 83%;
    flex-direction: column;
    margin-bottom: 20px;
  }
  .menus{
    align-items: center;
    width: 100%;
  }
}
</style>
