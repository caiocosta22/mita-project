<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

const $q = useQuasar();

const id = $q.localStorage.getItem("idclient");
const token = $q.localStorage.getItem("token");

const props = defineProps({
  dataaddress: {
    type: Object,
    required: true,
    default: () => {}
  }
});

const address = computed(() => { return props.dataaddress; });

const nome = ref("");
const cpf = ref("");
const cep = ref("");
const endereco = ref("");
const numero = ref("");
const referencia = ref("");
const bairro = ref("");
const estado = ref("");
const cidade = ref("");
const edicao = ref("1");

const corpoendereco = ref({
  bairro,
  cep,
  cidade,
  complemento: referencia,
  cpfDestinatario: cpf,
  idCliente: id,
  logradouro: endereco,
  nomeDestinatario: nome,
  numero,
  uf: estado
});

const corpoendereco2 = ref({
  bairro: "Centro",
  cep: "6300227",
  cidade: "Fortaleza",
  complemento: "até 598/599",
  cpfDestinatario: "12345678923",
  idCliente: 3,
  logradouro: "Rua 52",
  nomeDestinatario: "Caio Costa Teste Final",
  numero: "47",
  uf: "CE"
});

async function postAddress () {
  try {
    const data = await axios.post("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/clienteEnderecoService/addEcommerce", corpoendereco2.value, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (data.status === 200) {
      console.log("ENDERECO ENVIADO");
    } else {
      console.log(data.status);
      console.log(data.response);
    }
  } catch (e) {
    console.error(e);
  }
}

async function deleteAddress (id) {
  try {
    const data = await axios.get(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/clienteEnderecoService/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    location.reload();
    if (data.status === 200) {
      $q.notify({
        color: "green",
        textColor: "white",
        icon: "check",
        message: "Endereço deletado com sucesso!"
      });
    } else {
      $q.notify({
        color: "red",
        textColor: "white",
        icon: "alert",
        message: "Erro ao deletar o endereço, tente recarregar a página."
      });
      console.log(data.status);
    }
  } catch (e) {
    console.error(e);
  }
}

</script>

<template lang="pug">
div.container
  div.interno
    span.subtitulo#titulo Endereços
  template(
    v-if="edicao==='1'"
  )
    template(
        v-if="dataaddress.length===0"
      )
        div.interno
          div.conteudos(
            style="background-color: rgba(100,100,100,0.1);"
          )
            p.subtitulo Ops! Nenhum endereço  encontrado.
    template(
      v-for="address in dataaddress"
      :key="address"
    )
      div.interno
        div.conteudos
          div.column
            p.subtitulo Destinatário: {{ address.nomeDestinatario }}
            p.subtitulo(
              style="font-weight: 300;"
            ) {{ address.logradouro }}, {{ address.numero }}, {{ address.complemento }}
            p.subtitulo(
              style="font-weight: 300;"
            ) {{ address.cidade }} - {{ address.uf }} - CEP: {{ address.cep }}
          div.botoes
            q-btn(
              color="white"
              style="width: 150px; margin-bottom: 15px;"
            )
              span(
                style="color: #000;"
              ) Editar
            q-btn(
              color="black"
              style="width: 150px; margin-bottom: 15px;"
              @click="deleteAddress(address.id)"
            )
              span(
                style="color: #fff;"
              ) Deletar
    div.interno
      q-btn#end(
        color="green"
        @click="edicao='2'"
      )
        span(
          style="color: #fff;"
        ) ADICIONAR ENDEREÇO
  template(
    v-if="edicao==='2'"
  )
    div.interno
      div.input
        .subtitulo Nome do destinatário*
        q-input(
          outlined
          color="black"
          v-model="nome"
          lazy-rules
          :rules="[ val => val && val.length > 0 ||   'campo   obrigatório']"
        )
      div.input
        .subtitulo CPF*
        q-input(
          outlined
          color="black"
          v-model="cpf"
          placeholder="Ex: 123.456.789-14"
          lazy-rules
          :rules="[ val => val && val.length > 0 ||   'campo   obrigatório']"
        )
      div.input
        .subtitulo CEP*
        q-input(
          outlined
          color="black"
          v-model="cep"
          placeholder="Ex: 60700-700"
          lazy-rules
          :rules="[ val => val && val.length > 0 ||   'campo   obrigatório']"
        )
      div.input
        .subtitulo Endereço*
        q-input(
          outlined
          color="black"
          v-model="endereco"
          placeholder="Ex: Rua Exemplo"
          lazy-rules
          :rules="[ val => val && val.length > 0 ||   'campo   obrigatório']"
        )
      div.input
        .subtitulo Número*
        q-input(
          outlined
          color="black"
          v-model="numero"
          lazy-rules
          :rules="[ val => val && val.length > 0 ||   'campo   obrigatório']"
        )
      div.input
        .subtitulo Ponto de referência
        q-input(
          outlined
          color="black"
          v-model="referencia"
        )
      div.input
        .subtitulo Bairro*
        q-input(
          outlined
          color="black"
          v-model="bairro"
          lazy-rules
          :rules="[ val => val && val.length > 0 ||   'campo   obrigatório']"
        )
      div.input
        .subtitulo Estado*
        q-input(
          outlined
          color="black"
          v-model="estado"
          placeholder="Ex: CE"
          lazy-rules
          :rules="[ val => val && val.length > 0 ||   'campo   obrigatório']"
        )
      div.input
        .subtitulo Cidade*
        q-input(
          outlined
          color="black"
          v-model="cidade"
          placeholder="Ex: Fortaleza"
          lazy-rules
          :rules="[ val => val && val.length > 0 ||   'campo   obrigatório']"
        )
    div.input
      q-btn(
        color="green"
        push
        @click="postAddress()"
      )
        span(
          style="color: #fff;"
        ) SALVAR
      q-btn(
        color="black"
        push
        style="margin-top: 15px;"
        @click="edicao='1'"
      )
        span(
          style="color: #fff"
        ) Meus endereços
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
  margin-bottom: 10px;
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
.conteudos {
  border: 1px solid rgba(3,3,3,0.2);
  background-color: rgba(200,200,200,0.1);
  width: 700px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  margin-left: 15px;
  padding: 15px;
}
.botoes{
  display: flex;
  flex-direction: column;
}
#titulo{
  font-size: 24px;
  margin-left: 15px;
}
#end{
  margin-left: 15px;
  margin-top: 15px;
  width: 180px;
}
@media screen and (max-width: 1150px) {
  .interno {
  flex-direction: column;
  flex-wrap: nowrap;
}
.input {
  width: 100%;
  margin-left: 15px;
}
.conteudos{
  width: 500px;
  justify-content: start;
  flex-direction: column;
  align-items: start;
  margin-left: 15px;
}
}
@media screen and (max-width: 769px) {
  .conteudos{
    width: 100%;
    margin-left: 0px;
  }
  #titulo{
    margin-left: 0px;
  }
  #end{
    margin-left: 0px;
    margin-bottom: 15px;
    width: 100%;
  }
}
</style>
