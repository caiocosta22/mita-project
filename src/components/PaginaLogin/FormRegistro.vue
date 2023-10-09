<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const $q = useQuasar();
const nomeref = ref("");
const sobrenomeref = ref("");
const dsEmail = ref("");
const cpf = ref("");
const data = ref("");
const telefone = ref("");
const senharef = ref("");
const corporegistro = ref({
  nmCliente: nomeref.value,
  sobrenome: sobrenomeref.value,
  email: dsEmail.value,
  nrCpfCnpj: cpf.value,
  dataNascimento: data.value,
  nrTelefone: telefone.value,
  senha: senharef.value
});
const email = ref(null);
const password = ref(null);
const accept = ref(false);
const confirmpassword = ref(null);

const envioregistro = async () => {
  try {
    const response = await axios.post("https://elevar.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/clienteService/salvaEcommerce",
      corporegistro
    );
    console.log(response.status);
    if (response.status === 200) {
      $q.notify({
        color: "green-4",
        textColor: "white",
        icon: "cloud_done",
        message: "Registro concluído com sucesso!"
      });
    } else {
      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: "Ocorreu um erro! Tente novamente."
      });
    }
  } catch (error) {
    console.log(error);
  }
};

function redirectToLoginPage () {
  const url = "/login";
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
        @reset="onReset"
    )
        .titulo.q-pl-sm CRIAR CONTA
        div.row.flex.q-gutter-sm.nomesobrenome
            div.column.nome
                .primario Nome
                q-input(
                    outlined
                    color="black"
                    v-model="nomeref"
                    placeholder="Ex: João"
                )
            div.column.nome
                .primario Sobrenome
                q-input(
                    outlined
                    color="black"
                    v-model="sobrenomeref"
                    placeholder="Ex: Silva"
                )
            div.column.mediainput
                .primario Email
                q-input(
                outlined
                color="black"
                v-model="dsEmail"
                placeholder="Ex: email@email.com"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'E-mail obrigatório']"
            )
        div.row.flex.q-gutter-sm.mediacontainer
            div.column.mediainput
                .primario CPF
                q-input(
                    outlined
                    color="black"
                    v-model="cpf"
                    placeholder="Ex: 123.456.789-14"
                )
            div.column.mediainput
                .primario.mediainput Data Nascimento
                q-input(
                    outlined
                    color="black"
                    v-model="data"
                    placeholder="Ex: 00/00/0000"
                    mask="##/##/####"
                )
        div.row.flex.q-gutter-sm.mediacontainer
            div.column.mediainput
                .primario Telefone
                q-input(
                    outlined
                    color="black"
                    v-model="telefone"
                    placeholder="Ex: (99)99999-9999"
                )
        div.row.flex.q-gutter-sm.mediacontainer
            div.column.mediainput
                .primario Senha
                q-input(
                    outlined
                    color="black"
                    type="password"
                    v-model="senharef"
                    label="Digite sua senha"
                    lazy-rules
                    :rules="[ val => val && val.length > 0 || 'Por favor digite sua senha']"
                )
            div.column.mediainput
                .primario Confirme a senha
                q-input(
                    outlined
                    type="password"
                    v-model="confirmpassword"
                    label="Confirme sua senha"
                    @keypress.enter="envioregistro()"
                    lazy-rules
                    color="black"
                    :rules="[ val => val === senharef || 'As senhas não coincidem']"
                )
            a.esqueceu.cursor-pointer(
                @click="redirectToLoginPage()"
            ) Já tem uma conta? Faça login!
        div.q-pl-sm
            q-btn(
                label="REGISTRAR"
                type="submit"
                color="black"
                @click="envioregistro()"
                @keypress.enter="envioregistro()"
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
