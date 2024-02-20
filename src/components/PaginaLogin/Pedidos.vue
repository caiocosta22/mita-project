<script setup>
import { computed } from "vue";
import { useQuasar } from "quasar";
import axios from "axios";

const $q = useQuasar();
const token = $q.localStorage.getItem("token");

const props = defineProps({
  dataorder: {
    type: Object,
    required: true,
    default: () => {}
  }
});

const order = computed(() => { return props.dataorder; });

function formatCurrency (value) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  });
}
</script>

<template lang="pug">
div.container
  div.interno
    span.subtitulo#titulo Pedidos
  template(
    v-if="dataorder.length===0"
  )
    div.interno
      div.input
        div.infos(
          style="background-color: rgba(100,100,100,0.1);"
        )
          p.subtitulo Ops! Nenhum pedido encontrado.
  template(
    v-for="orders in order"
    :key="orders"
  )
    div.interno
      div.input
        div.infos(
          style="background-color: rgba(100,100,100,0.1);"
        )
          div.column
            p.subtitulo Data do pedido
            p.subtitulo(
              style="font-weight: 300;"
            ) {{orders.dataPedido}}
          div.column
            p.subtitulo Total
            p.subtitulo(
              style="font-weight: 300;"
            ) {{ formatCurrency(orders.valorFinal) }}
          div.column
            template(
              v-if="orders.status==='aguardando'"
            )
              q-btn(
                color="blue"
              )
                span(
                  style="color: #fff;     font-weight: 500;"
                ) Aguardando
            template(
              v-if="orders.status==='cancelado'"
            )
              q-btn(
                color="red"
              )
                span(
                  style="color: #fff;     font-weight: 500;"
                ) cancelado
            template(
              v-if="orders.status==='recebido'"
            )
              q-btn(
                color="green"
              )
                span(
                  style="color: #fff;     font-weight: 500;"
                ) Recebido
            a.subtitulo(
              style="font-weight: 300; cursor: pointer;"
            ) Repetir Pedido
          div.column
            p.subtitulo N PEDIDO: {{ orders.id }}
            a.subtitulo(
              style="font-weight: 300; cursor: pointer;"
            ) Detalhes do pedido
        div.infos
          div.column
            template(
              v-for="item in orders.itemPedido"
              :key="item"
            )
              div.flex.row
                div.produto
                  q-img(
                    :src="item.foto"
                  )
                div.column(
                  style="margin-left: 15px;"
                )
                  p.subtitulo {{ item.descricao }}
                  p.subtitulo {{ formatCurrency(item.valor) }}
          q-btn(
            color="black"
            style="height: 50px; width: 300px;"
          )
            span(
              style="color: #fff;font-weight: 500;"
            ) Comprar novamente
</template>

<style scoped>
.produto{
  width: 100px;
  height: 100px;
}
.infos {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(0,0,0,0.5);
  padding: 15px;
}
.container {
  display: flex;
  flex-direction: column;
}
.interno {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.input {
  display: flex;
  margin-bottom: 30px;
  flex-direction: column;
  width: 700px;
  margin-left: 15px;
}
.subtitulo {
  color: black;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 5px;
}
a.subtitulo{
  color: #a9a9a9;
}
#titulo {
  font-size: 24px;
  margin-left: 15px;
}
@media screen and (max-width: 1150px){
  .input{
    margin-left: 0px;
  }
  #titulo {
    margin-left: 0px;
  }
}
</style>
