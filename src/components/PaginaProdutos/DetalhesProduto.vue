<script setup>
import { ref, computed } from "vue";
const text1 = ref(""); // Referência para o texto digitado no q-input
const text = ref(); // Ref para o texto digitado no CEP
const props = defineProps({
  product: {
    type: Object,
    required: true,
    // ! Dentro desse objeto monte um exemplo de como receberá o produto
    // ? Produto dever possuir a KEY id, se preferir pode transformar
    // * Dicas: Nessa tela não vai ser preciso se utilizar de v-for
    // * Se quiser ver como vem um produto é só dar console.log()
    default: () => {}
  }
});
const produto = computed(() => { return props.product; });
const principalImg = ref(produto.value.fotosServico[0].foto);
</script>

<template lang="pug">
div.row.q-gutter-md.justify-center
  div.column.q-gutter-lg.q-pa-md
    template(
      v-for="objFoto in produto.fotosServico"
      :key="objFoto"
    )
      img.min(
        @click="principalImg = objFoto.foto"
        v-if="objFoto.foto"
        :src="objFoto.foto"
      )
  div
    q-img(
      v-if="principalImg"
      :src="principalImg"
      style="width:545px;height:641.935px;box-shadow:none"
      no-native-menu
    )
      .text-on-image {{ text1 }}
  div.column.q-pa-sm
    p.tituloprod {{ produto.descricao }}
    p COD: {{ produto.codigo }}
    p.destaque CUSTOMIZAÇÃO
    div.column
      p.destaque Adicione seu nome no produto!
      q-input(
        v-model="text1"
        outlined
        placeholder="Digite aqui"
        color="black"
        label-color="black"
        maxlength="15"
      )
    div.justify-between.row
      template(
        v-if="produto.promocao"
      )
        .destaque.justify-end valordesconto
      .destaque.q-pt-md.q-pb-md VALOR
      .destaque {{ produto.valor }}
    q-separator(color="black")
    div.row.justify-between(style="flex-wrap: nowrap;")
      p.destaque(style="padding-top: 20px;") CALCULAR FRETE
      q-input(
        v-model="text"
        label="CEP"
        color="black"
        style="width: 340px;"
      )
        template(v-slot:append)
          q-icon(name="search")
    a.cep.q-pb-md(href="https://buscacepinter.correios.com.br/app/endereco/index.php?t") NÃO SEI MEU CEP
    q-btn.botao.q-pa-md(
      color="green"
      label="C O M P R A R"
      style="width: 516px; height:52px"
    )
.col-10.row
  p.col-1
  h5.col-5(style="font-weight: bold;") DETALHES DO PRODUTO
.col-10.row.justify-start
  p.detalhes.col-9 {{ produto.descricaoLonga }}
  p.col-1
</template>

<style scoped>
.min{
  max-width:150px;
  max-height:200px;
}
p.detalhes{
  color: #000;
  font-family: Catamaran;
  font-size: 18px;
  font-style: normal;
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
  padding-top:10px
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
