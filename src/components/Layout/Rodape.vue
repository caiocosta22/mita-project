<script setup>
import axios from "axios";
import { ref, onBeforeMount } from "vue";

const infos = ref({});

async function searchBestSellers () {
  try {
    infos.value = await axios.get("/api/empresaService/ecommerce/nomeTenant").then(e => e.data);
  } catch (e) {
    console.error(e);
  }
}

onBeforeMount(async () => {
  await searchBestSellers();
});
</script>

<template lang="pug">
div.row.justify-center.text-bold.q-pa-md(style="flex-wrap:nowrap")
  div.Institucional.column.cursor-pointer(style="width:264px")
    p.principal Institucional
    p.cursor-pointer.secundario(href="#") A empresa
    p.secundario Sustentatabilidade
  div.MeusDados.column.cursor-pointer(style="width:264px")
    p.principal Minha conta
    p.secundario Meus pedidos
    p.secundario Minha Sacola
  div.Suporte.column.cursor-pointer(style="width:264px")
    p.principal Ajuda e Suporte
    p.secundario Política de Entrega
    p.secundario Trocas e Devoluções
  div.Contato.column.cursor-pointer(style="width:264px")
    p.principal Contato
    p.secundario Fale Conosco
    p.secundario atendimento@mita.com.br
    p.secundario SAC(00)0000-0000
    p.secundario Atendimento:<br>Segunda à sexta, de 9h as 17h.
  div.Redes.column(style="width:264px")
    p.principal Nossas redes sociais
    div.row.cursor-pointer
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
*{
  color:black
}
.principal{
  font-size:22px
}
.secundario{
  font-size:20px
}
</style>
