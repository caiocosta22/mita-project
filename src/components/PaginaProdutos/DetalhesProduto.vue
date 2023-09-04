<script setup>
import { ref, watch } from "vue";
const options = ref(["DINHEIRO", "PIX", "CARTAO DE CREDITO"]);
const text1 = ref(""); // Referência para o texto digitado no q-input
const textOnImage = ref(""); // Referência para exibir o texto na imagem
watch(text1, (newText) => {
  textOnImage.value = newText;
});
</script>

<template lang="pug">
.row.justify-center.q-gutter-sm
  .column.q-gutter-md
    img.min(src="../../assets/imgs/paginaprodutos/carteira.png")
    img.min(src="../../assets/imgs/paginaprodutos/carteira.png")
    img.min(src="../../assets/imgs/paginaprodutos/carteira.png")
  q-img.foto(src="../../assets/imgs/paginaprodutos/carteiragrande.png" no-native-menu)
    q-icon(class="absolute all-pointer-events cursor-pointer" size="24px" name="fullscreen" color="black" style="top:8px;right:8px")
    .text-on-image {{ textOnImage }}
  div.column.q-gutter-sm
    .row.justify-between
      p.tituloprod Carteira Feminina
      .row.q-gutter-md.align-center.q-pt-md
        q-icon.cursor-pointer
          img(src="../../assets/svgs/share.svg" style="width:24px; height:24px")
        q-icon.cursor-pointer
          img(src="../../assets/svgs/like.svg" style="width:24px; height:24px")
    p COD: 0001
    p.destaque CUSTOMIZAÇÃO
    p.destaque COR
      q-icon.cursor-pointer.q-pl-md
        img(src="../../assets/svgs/elipsecinza.svg" style="width:24px; height:24px")
      q-icon.cursor-pointer.q-pl-md
        img(src="../../assets/svgs/elipsecreme.svg" style="width:24px; height:24px")
      q-icon.cursor-pointer.q-pl-md
        img(src="../../assets/svgs/elipsemarrom.svg" style="width:24px; height:24px")
    .column
      p.destaque Adicione seu nome no produto!
      q-input(outlined v-model="text1" placeholder="Digite aqui" color="black" label-color="black" maxlength="10")
    .row.justify-between
      p.destaque VALOR
      p.destaque R$279,00
    q-separator(color="black")
    .row.justify-between
      p.destaque.col-6 FORMAS DE PAGAMENTO
      q-select(bordeless v-model="model" :options="options" label-color="black" label="A VISTA" color="black").col-5
    .row.justify-between
      p.destaque(style="width:45%") CUPOM DE DESCONTO
      q-input(v-model="text" label="CUPOM" color="black" style="width:55%")
    .row.justify-between
      p.destaque(style="width:45%") CALCULAR FRETE
      q-input(v-model="text" label="CEP" color="black" style="width:55%")
        template(v-slot:append)
          q-icon(name="search")
    a.cep(href="#") NÃO SEI MEU CEP
    q-btn.botao.q-pa-md(
      color="green" label="C O M P R A R" style="width: 516px; height:52px")
  .q-pa-md
    h6 DETALHES
    p AQUI FICA TODAS AS INFORMAÇÕES PERTINENTES AO PRODUTO. MATERIAL FEITO. CORES. COLEÇÕES E DIMENSÕES.
</template>

<style scoped>
.min{
  max-width:170px;
  max-height:200.282px;
}
p.oi{
  color: #000;
  font-family: Catamaran;
  font-size: 20px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  margin: auto;
}
.foto{
  max-width:545px;
  max-height:641.935px;
  box-shadow:none
}
.tituloprod{
  color: #000;
  font-family: Catamaran;
  font-size: 28px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
}
.destaque{
  color: #000;
  font-family: Catamaran;
  font-size: 20px;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  align-items: center;
  display: flex;
}
.cep{
  color: #939598;
  font-family: Catamaran;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  text-decoration-line: underline;
}
.detalhesprod{
  color: #939598;
  font-family: Catamaran;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
}
.text-on-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1; /* Garanta que ele esteja acima da imagem */
  font-size: 20px; /* Ajuste o tamanho da fonte conforme necessário */
  box-shadow:none;
  color: black;
  background-color: rgba(0,0,0,0);
}
</style>
