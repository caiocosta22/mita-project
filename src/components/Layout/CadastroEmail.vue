<script setup>
import { ref } from "vue";
import axios from "axios";
import { useQuasar } from "quasar";

const $q = useQuasar();

const email = ref("");
const nome = ref("");

const envioemail = async () => {
  try {
    const response = await axios.post("https://elevar.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/ecommerce/newsLetterService/sav", {
      email: email.value
    });
    console.log(response.status);
    if (response.status === 200) {
      $q.notify({
        message: "Email enviado com sucesso!"
      });
    } else {
      $q.notify({
        message: "Erro no envio de email"
      });
    }
  } catch (error) {
    console.log(error);
    $q.notify({
      message: "Erro no envio de email"
    });
  }
};
</script>

<template lang="pug">
div.container.col.q-pt-md
  div.row.email.fit.col-10.q-gutter-sm.q-pa-sm
    div.texto.col-3.q-pl-sm
      span.titulo(style="color: #000;font-size: 24px;font-weight: 400;") Cadastre-se em nossa Lista Vip
      span.subtexto(style="color: #000;font-size: 18px;font-weight: 300;") Fique por dentro de tudo que acontece e receba novidades e ofertas exclusivas!
    q-input.nomeinput.col-2(
      standout
      v-model="nome"
      label="Digite seu nome"
      bg-color="white"
      color="black"
      label-color="black"
      text="black"
      outlined
    )
    q-input.emailinput.col-3(
      standout
      v-model="email"
      label="Digite seu e-mail"
      bg-color="white"
      color="black"
      label-color="black"
      outlined
      v-validate="'required|email'"
    )
    q-btn.col-2.botao.q-pa-md(
      color="black"
      label="Cadastrar"
      @click="envioemail"
    )
</template>

<style scoped>
*{
  color: black;
}
.texto{
  text-align:left;
  display: flex;
  flex-direction: column;
}
.email{
  display:flex;
  flex-wrap:nowrap;
  justify-content:center;
  position: relative;
  box-sizing: border-box;
  align-items: center;
}
@media screen and (max-width: 1024px) {
.email{
  display: flex;
  flex-direction: column;
}
.texto{
  padding: 0;
}
.email>div{
  width: 84%;
}
.nomeinput{
  width: 84%;
}
.emailinput{
  width: 84%;
}
.botao{
  width: 84%;
}
}

</style>
