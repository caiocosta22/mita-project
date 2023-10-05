<script setup>
import { ref, onBeforeMount } from "vue";
import axios from "src/boot/axios";

const infos = ref({
  facebook: "https://www.facebook.com/",
  googlePlus: "",
  id: 1,
  instagram: "https://www.instagram.com/"
});

async function searchSocialMedia () {
  try {
    infos.value = await axios.get("/api/empresaService/ecommerce/nomeTenant").then(e => e.data);
  } catch (e) {
    console.error(e);
  }
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
    p.secundario Meus pedidos
    p.secundario Minha Sacola
  div.Suporte.column.col-2
    p.principal Ajuda e Suporte
    p.secundario Política de Entrega
    p.secundario Trocas e Devoluções
  div.Contato.column.col-2
    p.principal Contato
    p.secundario Fale Conosco
    p.secundario atendimento@mita.com.br
    p.secundario SAC(00)0000-0000
    p.secundario Atendimento:<br>Segunda à sexta, de 9h as 17h.
  div.Redes.column.col-2
    p.principal Nossas redes sociais
    div.row
      a(
        target="_blank"
        href="https://www.instagram.com/mita.oficial/"
      )
        q-icon(
          size="md"
          name="fa-brands fa-square-facebook"
        )
      a(
        target="_blank"
        href="https://www.instagram.com/mita.oficial/"
      )
        q-icon.q-mx-lg(
          size="md"
          name="fa-brands fa-instagram"
        )
      a(
        target="_blank"
        href="https://api.whatsapp.com/send?phone=5585991896604"
      )
        q-icon(
          size="md"
          name="fa-brands fa-whatsapp"
        )
div.rodape2.col.column
  div.containerrodape2
    q-expansion-item.listas.text-bold(
      expand-separator
      label="Institucional"
    )
      q-card.listas
        q-card-section
          a(href="#") A empresa
        q-card-section
          a(href="#") Política de Entrega
        q-card-section
          a(href="#") Privacidade e Segurança
        q-card-section
          a(href="#") Trocas e Devoluções
    q-expansion-item.listas.text-bold(
      expand-separator
      label="Minha Conta"
    )
      q-card.listas
        q-card-section
          a(href="#") Perfil
        q-card-section
          a(href="#") Meus pedidos
        q-card-section
          a(href="#") Meu carrinho
    q-expansion-item.listas.text-bold(
      expand-separator
      label="Ajuda e suporte"
    )
      q-card.listas
        q-card-section
          a(href="#") Nosso chat
    q-expansion-item.listas.text-bold(
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
div.text-black.justify-center.text-center.text-bold.row
  p MITA C V A DE C LTDA.
  p(v-if="infos.street") &nbsp; | {{ infos.street }}
  p(v-if="infos.number") , {{ infos.number }}
  p(v-if="infos.district") , {{ infos.district }}
  p(v-if="infos.city") , {{ infos.city }}
  p(v-if="infos.state") , {{ infos.state }}
  p(v-if="infos.zipcode") &nbsp; | CEP: &nbsp; {{ infos.zipcode }}
  p(v-if="infos.cnpj") &nbsp; | CNPJ: &nbsp; {{ infos.cnpj }}
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
