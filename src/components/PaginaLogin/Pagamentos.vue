<script setup>
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

const $q = useQuasar();

const id = $q.localStorage.getItem("idclient");
const token = $q.localStorage.getItem("token");

const props = defineProps({
  datapayment: {
    type: Object,
    required: true,
    default: () => {}
  }
});

const payment = computed(() => { return props.datapayment; });
console.log(payment);

const edicao = ref("1");
const nome = ref();
const cvv = ref();
const cpf = ref(formatarCPF(""));
const email = ref();
const numero = ref();
const validade = ref();
const logradouro = ref();
const complemento = ref();
const bairro = ref();
const cidade = ref();
const estado = ref();
const cep = ref(formatarCEP(""));
const numeroend = ref();

const corpopayment = ref(
  {
    bandeira: "",
    cvv,
    cpfCnpjCliente: cpf,
    cpfCnpj: cpf,
    email,
    numero,
    id,
    validade,
    nome,
    tipoPessoaCliente: "fisica",
    tokenMercadoPago: null,
    faturamento: {
      nome,
      endereco: {
        logradouro,
        complemento,
        numero: numeroend,
        bairro,
        cidade,
        estado,
        cep,
        pais: "br"
      }
    }
  }
);

function formatarCPF (cpf) {
  const cpfLimpo = cpf.replace(/\D/g, "");

  if (cpfLimpo.length !== 11) {
    return "CPF inválido";
  }
  return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

function formatarCEP (cep) {
  const cepLimpo = cep.replace(/\D/g, "");

  if (cepLimpo.length !== 8) {
    return "CEP inválido";
  }

  return cepLimpo.replace(/(\d{5})(\d{3})/, "$1-$2");
}

async function postPayment () {
  try {
    const data = await axios.post("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/clienteEnderecoService/addEcommerce", corpopayment.value, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (data.status === 200) {
      $q.notify({
        color: "green",
        textColor: "white",
        icon: "check",
        message: "Endereço adicionado com sucesso! atualizando a página."
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
      console.log("ENDERECO ENVIADO");
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

async function deletePayment (id) {
  try {
    const data = await axios.get(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/clienteEnderecoService/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (data.status === 200) {
      $q.notify({
        color: "green",
        textColor: "white",
        icon: "check",
        message: "Endereço deletado com sucesso! atualizando a página."
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
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
    span.subtitulo#titulo Pagamentos
  template(
    v-if="edicao==='1'"
  )
    template(
      v-if="payment.length === 0"
    )
      div.interno
        div.conteudos
          p.subtitulo Ops! Nenhum método de pagamento encontrado.
          q-btn(
            color="green"
            push
            @click="edicao='2'"
          )
            span(
              style="color: #fff;"
            ) ADICIONAR
  template(
    v-if="edicao==='2'"
  )
    div.interno
      div.input
        .subtitulo Numero do cartão*
        q-input(
          outlined
          color="black"
          v-model="numero"
          lazy-rules
          placeholder="Número do cartão"
          mask="#### #### #### ####"
          :rules="[ val => val && val.length > 0 ||   'campo   obrigatório']"
        )
      div.input
        .subtitulo Nome do titular (como impresso no cartáo)*
        q-input(
          outlined
          color="black"
          v-model="nome"
          placeholder="Nome do titular"
          lazy-rules
          :rules="[ val => val && val.length > 0 ||   'campo   obrigatório']"
        )
      div.input
        .subtitulo Validade*
        q-input(
          outlined
          color="black"
          v-model="validade"
          placeholder="Ex: 02/25"
          lazy-rules
          mask="##/##"
          :rules="[ val => val && val.length > 0 ||   'campo   obrigatório']"
        )
      div.input
        .subtitulo CVV*
        q-input(
          outlined
          color="black"
          v-model="cvv"
          mask="###"
          placeholder="CVV"
          lazy-rules
          :rules="[ val => val && val.length > 0 ||   'campo   obrigatório']"
        )
      div.input
        .subtitulo CPF do titular*
        q-input(
          outlined
          color="black"
          v-model="cpf"
          mask="###.###.###-##"
          placeholder="CPF do titular"
          lazy-rules
          :rules="[ val => val && val.length > 0 ||   'campo   obrigatório']"
        )
      div.input
        .subtitulo Email do titular*
        q-input(
          outlined
          color="black"
          v-model="email"
          lazy-rules
          placeholder="Email do titular"
          :rules="[ val => val && val.length > 0 ||   'campo   obrigatório']"
        )
    div.interno
      span.subtitulo#titulo Endereço da fatura
    div.interno
      div.input
        .subtitulo CEP*
        q-input(
          outlined
          color="black"
          v-model="cep"
          mask="#####-###"
          placeholder="Ex: 60300-000"
        )
      div.input
        .subtitulo Logradouro*
        q-input(
          outlined
          color="black"
          v-model="logradouro"
          lazy-rules
          placeholder="Avenida 123"
          :rules="[ val => val && val.length > 0 ||   'campo   obrigatório']"
        )
      div.input
        .subtitulo Numero*
        q-input(
          outlined
          color="black"
          v-model="numeroend"
          placeholder="Ex: 103"
          lazy-rules
          :rules="[ val => val && val.length > 0 ||   'campo   obrigatório']"
        )
      div.input
        .subtitulo Complemento*
        q-input(
          outlined
          color="black"
          v-model="complemento"
          placeholder="Ex: Perto do shopping"
          lazy-rules
          :rules="[ val => val && val.length > 0 ||   'campo   obrigatório']"
        )
      div.input
        .subtitulo Bairro*
        q-input(
          outlined
          color="black"
          v-model="bairro"
          placeholder="Ex: Aldeota"
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
        .subtitulo Estado*
        q-input(
          outlined
          color="black"
          v-model="estado"
          placeholder="Ex: CE"
          lazy-rules
          maxlength="2"
          :rules="[ val => val && val.length > 0 ||   'campo   obrigatório']"
        )
    div.input
      q-btn(
        color="green"
        push
        @click="postPayment()"
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
        ) Meus pagamentos
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
  margin-bottom: 15px;
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
  .input {
    margin-left: 0px;
  }
}
</style>
