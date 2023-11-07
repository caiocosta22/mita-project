<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";
import axios from "axios";

const router = useRouter();
const $q = useQuasar();

const cartId = $q.localStorage.getItem("cartIdBackend");
const linkcarrinho = `https://mitaoficial.elevarone.com.br/checkout?idCart=${cartId}`;

const infosLinks = ref({
  city: "Fortaleza",
  cnpj: "28463426000109",
  complement: "",
  district: "Meireles",
  email: "LOJAMITAOFICIAL@GMAIL.COM",
  id: 5,
  name: "MITA COMERCIO VAREJISTA DE ARTEFATOS DE COURO LTDA",
  nomeFantasia: "Mita Oficial",
  number: 705,
  phone: "85991742677",
  site: "https://mitaoficial.elevarloja.com.br",
  state: "CE",
  street: "Avenida Dom Luís",
  zipcode: "60160230",
  socialNetwork: []
});

function maskPhoneNumber (phoneNumber) {
  if (phoneNumber && phoneNumber.length >= 2) {
    return `(${phoneNumber.substring(0, 2)})${phoneNumber.substring(2)}`;
  }
  return phoneNumber;
};

async function searchSocialMedia () {
  try {
    const infos = await axios.get("https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/empresaService/ecommerce/nomeTenant").then(e => e.data);
    infosLinks.value = infos;
  } catch (e) {
    console.error(e);
  }
}

function redirectToHTMLPage () {
  const url = "/trocas/";
  router.push(url);
}

function redirectToHTMLPage2 () {
  const url = "/politicas/";
  router.push(url);
}

onBeforeMount(async () => {
  await searchSocialMedia();
});

</script>

<template lang="pug">
div.rodape.row.justify-center.col-10.q-pa-md.q-gutter-sm(style="flex-wrap:nowrap")
  div.Institucional.column.col-2(style="padding-left: 4px;")
    p.principal Institucional
    p.secundario(href="#") A empresa
    p.secundario Sustentatabilidade
  div.MeusDados.column.col-2
    p.principal Minha conta
    a(:href="linkcarrinho")
      p.secundario Meus pedidos
    a(:href="linkcarrinho")
      p.secundario Minha Sacola
  div.Suporte.column.col-2
    p.principal Ajuda e Suporte
    p.secundario(@click="redirectToHTMLPage2") Política de Entrega
    p.secundario(@click="redirectToHTMLPage") Trocas e Devoluções
  div.Contato.column.col-2
    p.principal Contato
    p.secundario Fale Conosco
    p.secundario(style="text-transform: lowercase") {{ infosLinks.email }}
    p.secundario SAC {{ maskPhoneNumber(infosLinks.phone) }}
    p.secundario Atendimento:<br>Segunda à sexta, de 9h as 17h.
  div.Redes.column.col-2
    p.principal Nossas redes sociais
    div.row.q-gutter-sm
      template(
        v-if="infosLinks.socialNetwork.facebook"
      )
        a(
          target="_blank"
          :href="infosLinks.socialNetwork.facebook"
        )
          q-icon(
            size="md"
            name="fa-brands fa-square-facebook"
          )
      template(
        v-if="infosLinks.socialNetwork.instagram"
      )
        a(
          target="_blank"
          :href="infosLinks.socialNetwork.instagram"
        )
          q-icon(
            size="md"
            name="fa-brands fa-instagram"
          )
      template(
        v-if="infosLinks.socialNetwork.linkedin"
      )
        a(
          target="_blank"
          :href="infosLinks.socialNetwork.linkedin"
        )
          q-icon(
            size="md"
            name="fa-brands fa-linkedin"
          )
      template(
        v-if="infosLinks.socialNetwork.twitter"
      )
        a(
          target="_blank"
          :href="infosLinks.socialNetwork.twitter"
        )
          q-icon(
            size="md"
            name="fa-brands fa-x-twitter"
          )
      template(
        v-if="infosLinks.socialNetwork.youtube"
      )
        a(
          target="_blank"
          :href="infosLinks.socialNetwork.youtube"
        )
          q-icon(
            size="md"
            name="fa-brands fa-square-youtube"
          )
div.rodape2.col.column
  div.containerrodape2
    q-expansion-item.listas(
      expand-separator
      label="Institucional"
    )
      q-card.listas
        q-card-section
          a.cursor-pointer(href="#") A empresa
        q-card-section
          a.cursor-pointer(@click="redirectToHTMLPage2") Política de Entrega
        q-card-section
          a.cursor-pointer(href="#") Privacidade e Segurança
        q-card-section
          a.cursor-pointer(@click="redirectToHTMLPage") Trocas e Devoluções
    q-expansion-item.listas(
      expand-separator
      label="Minha Conta"
    )
      q-card.listas
        q-card-section
          a.cursor-pointer(href="#") Perfil
        q-card-section
          a.cursor-pointer(:href="linkcarrinho") Meus pedidos
        q-card-section
          a.cursor-pointer(:href="linkcarrinho") Meu carrinho
    q-expansion-item.listas(
      expand-separator
      label="Ajuda e suporte"
    )
      q-card.listas
        q-card-section
          a(href="#") Nosso chat
    q-expansion-item.listas(
      expand-separator
      label="Contato"
    )
      q-card.listas
        q-card-section
          p atendimento@mita.com.br
        q-card-section
          p (00)00000-0000
        q-card-section
          p Atendimento: <br> Segunda à sexta, de 9h as 17h.
div.text-black.justify-center.text-center.row(style="color: #000;text-align: center;font-family: Catamaran;font-size: 14px;font-style: normal;font-weight: 300;line-height: normal;")
  p MITA C V A DE C LTDA.
  p(v-if="infosLinks.street") &nbsp; | {{ infosLinks.street }}
  p(v-if="infosLinks.number") , {{ infosLinks.number }}
  p(v-if="infosLinks.district") , {{ infosLinks.district }}
  p(v-if="infosLinks.city") , {{ infosLinks.city }}
  p(v-if="infosLinks.state") , {{ infosLinks.state }}
  p(v-if="infosLinks.zipcode") &nbsp; | CEP: &nbsp; {{ infosLinks.zipcode }}
  p(v-if="infosLinks.cnpj") &nbsp; | CNPJ: &nbsp; {{ infosLinks.cnpj }}
div.copyright
  a.row(
    style="text-align: center; align-items: center; margin: 0 auto"
  )
    p Tecnologia
    img(
      src="/images/elevar.png"
      style="display: block; padding-bottom: 12px; padding-left: 5px;"
    )
</template>

<style scoped>
a{
  text-decoration: none;
}
*{
  color:black
}
.principal{
  color: #000;
  font-family: Catamaran;
  font-size: 18px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}
.secundario{
  color: #000;
  font-family: Catamaran;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  cursor: pointer;
  line-height: 20px; /* 153.846% */
}
.listas{
  box-shadow:none
}
.containerrodape2{
  display: flex;
  flex-direction: column;
  margin: auto;
  width: 87%;
}
.copyright {
  display: flex;
}
@media screen and (min-width: 1025px) {
  .rodape2{
    display:none;
    padding: 20px;
  }
}
@media screen and (max-width: 1025px) {
  .rodape{
    display:none;
    flex-direction: column;
  }
  .secundario{
    font-weight: bold;
    font-size: 17px;
  }
  .primario{
    font-weight: bolder;
    font-size: 20px;
  }
}
</style>
