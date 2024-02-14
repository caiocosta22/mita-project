<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import axios from "axios";

const router = useRouter();
const $q = useQuasar();

const loginSalvo = $q.localStorage.getItem("login");
const senhaSalva = $q.localStorage.getItem("senha");

const login = ref("");
const senha = ref("");

const isPwd = ref(true);

const envioLogin = async () => {
  try {
    const response = await axios.post("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/clienteService/getAutenticacaoEcommerce",
      {
        login: login.value,
        senha: senha.value
      }
    );
    const usuario = response.data;
    if (response.status === 200) {
      $q.localStorage.set("login", login.value);
      $q.localStorage.set("senha", senha.value);
      $q.localStorage.set("nome", usuario.nmCliente);
      $q.localStorage.set("idclient", usuario.idCliente);
      router.push("/");
    } else {
      $q.notify({
        color: "red-5",
        textColor: "white",
        icon: "warning",
        message: "Credenciais Incorretas! Tenta novamente."
      });
    }
  } catch (error) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "Erro ao tentar Login! Tente novamente"
    });
    console.log(error);
  }
};

function redirectToRegisterPage () {
  const url = "/registro";
  router.push(url);
}

onMounted(() => {
  if (loginSalvo && senhaSalva) {
    router.push("/login/usuario");
  }
});
</script>

<template lang="pug">
div.container
    .q-form.q-gutter-md.containerlogin.q-pa-md(
        @reset="onReset"
    )
        .titulo Faça seu Login
        div.column
          .primario Email
          q-input(
              outlined
              v-model="login"
              label="Digite seu email"
              lazy-rules
              color="black"
              :rules="[ val => val && val.length > 0 || 'E-mail obrigatório']"
          )
        div.column
          .primario Senha
          q-input(
              outlined
              :type="isPwd ? 'password' : 'text'"
              v-model="senha"
              label="Digite sua senha"
              lazy-rules
              color="black"
              :rules="[ val => val && val.length > 0 || 'Por favor digite sua senha']"
              @keypress.enter="envioLogin()"
          )
            template(v-slot:append)
              q-icon(
                size="xs"
                color="black"
                :name="isPwd ? 'visibility_off' :   'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              )
          a.esqueceu.cursor-pointer Esqueceu sua senha?
        div.botoes
            q-btn(
                label="Login"
                type="submit"
                color="black"
                @click="envioLogin()"
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
