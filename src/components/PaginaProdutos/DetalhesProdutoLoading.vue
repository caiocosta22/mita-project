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
const produto = computed(() => { return props.product ? props.product : ""; });
</script>

<template lang="pug">
div.row.justify-center.col.q-pa-md.q-gutter-sm
  div.row.col-7.justify-center
    div.col-2.column.q-gutter-sm.q-mr-xl
      q-skeleton(
        height="195px"
      )
      q-skeleton(
        height="195px"
      )
      q-skeleton(
        height="195px"
      )
    q-skeleton.col-6(
      height="600px"
    )
  div.col-3.column
      q-skeleton.col-1(
        type="text"
        class="text-subtitle1"
        height="300px"
      )
      q-skeleton.col-1(
        type="text"
        class="text-subtitle1"
      )
      q-skeleton.col-1(
        type="text"
        class="text-caption"
      )

      q-skeleton.col-2(
        type="text"
        class="text-caption"
      )
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
