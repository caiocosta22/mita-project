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
    p(style="font-size:17px") Institucional
    p.cursor-pointer(href="#") A empresa
    p Sustentatabilidade
  div.MeusDados.column.cursor-pointer(style="width:264px")
    p(style="font-size:17px") Minha conta
    p Meus pedidos
    p Minha Sacola
  div.Suporte.column.cursor-pointer(style="width:264px")
    p(style="font-size:17px") Ajuda e Suporte
    p Política de Entrega
    p Trocas e Devoluções
  div.Contato.column.cursor-pointer(style="width:264px")
    p(style="font-size:17px") Contato
    p Fale Conosco
    p atendimento@mita.com.br
    p SAC(00)0000-0000
    p Atendimento:<br>Segunda à sexta, de 9h as 17h.
  div.Redes.column(style="width:264px")
    p(style="font-size:17px") Siga-nos nas redes sociais
    div.row.cursor-pointer
      q-icon.q-pr-lg
        img(src="../../assets/svgs/instagram.svg" style="width: 18px; height: 18px;")
      q-icon.q-pr-lg
        img(src="../../assets/svgs/facebook.svg" style="width: 18px; height: 18px;")
      q-icon.q-pr-lg
        img(src="../../assets/svgs/youtube.svg" style="width: 18px; height: 18px;")
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
</style>
