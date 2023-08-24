<script setup>
</script>

<template lang="pug">
q-container.justify-center(style="max-width:1320px")
  div.row.justify-between.text-bold(style="max-width:1320px")
    div.Institucional.column.cursor-pointer
      p(style="font-size:17px") Institucional
      p.cursor-pointer(href="#") A empresa
      p Sustentatabilidade
    div.MeusDados.column.cursor-pointer
      p(style="font-size:17px") Minha conta
      p Meus pedidos
      p Minha Sacola
    div.Suporte.column.cursor-pointer
      p(style="font-size:17px") Ajuda e Suporte
      p Política de Entrega
      p Trocas e Devoluções
    div.Contato.column.cursor-pointer
      p(style="font-size:17px") Contato
      p Fale Conosco
      p atendimento@mita.com.br
      p SAC(00)0000-0000
      p Atendimento:<br>Segunda à sexta, de 9h as 17h.
    div.Redes.column
      p(style="font-size:17px") Siga-nos nas redes sociais
      div.row.cursor-pointer
        q-icon.q-pr-lg
          img(src="../../assets/svgs/instagram.svg" style="width: 18px; height: 18px;")
        q-icon.q-pr-lg
          img(src="../../assets/svgs/facebook.svg" style="width: 18px; height: 18px;")
        q-icon.q-pr-lg
          img(src="../../assets/svgs/youtube.svg" style="width: 18px; height: 18px;")
div.text-black.justify-center.text-center.text-bold
  p MITA C V A DE C LTDA. | Av. Dom Luis, 685, Meireles, Fortaleza, Ceará, CEP 60.160-230 | CNPJ: 28.463.426/0001-09
</template>

<style scoped>
*{
  color:black
}
</style>
