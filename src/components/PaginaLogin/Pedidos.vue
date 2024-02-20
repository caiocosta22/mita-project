<script setup>
import { computed, ref } from "vue";
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

const detalhes = ref("1");
const idpedido = ref("");
const datadetails = ref("");

async function searchDetails (id) {
  try {
    const data = await axios.get(`https://mitaoficial.elevarloja.com.br/api/ecommerce/agendamentoExternoService/getPagamentoByIdAgendamento/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (data.status === 200) {
      idpedido.value = id;
      datadetails.value = data.data;
      console.log("INFORMACOES DOS PEDIDOS:", datadetails.value);
      detalhes.value = "2";
    } else {
      console.log(data.status);
      console.log(data.response);
    }
  } catch (e) {
    console.error(e);
  }
}

function formatCurrency (value) {
  const numericValue = Number(value);

  if (isNaN(numericValue)) {
    return value;
  } else if (Number.isInteger(numericValue)) {
    return numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  } else {
    return numericValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2
    });
  }
}

function formatarData (dataString) {
  const data = new Date(dataString);

  const dia = String(data.getDate()).padStart(2, "0");
  const mes = String(data.getMonth() + 1).padStart(2, "0");
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
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
        div.infos
          p.subtitulo Ops! Nenhum pedido encontrado.
  template(
    v-if="detalhes==='1'"
  )
    template(
      v-for="orders in order"
      :key="orders"
    )
      div.interno
        div.input
          div.infos
            div.column
              p.subtitulo Data do pedido
              p.subtitulo(
                style="font-weight: 300;"
              ) {{formatarData(orders.dataPedido)}}
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
                  unelevated
                )
                  span(
                    style="color: #fff;       font-weight: 500;"
                  ) Aguardando
              template(
                v-if="orders.status==='cancelado'"
              )
                q-btn(
                  color="red"
                  unelevated
                )
                  span(
                    style="color: #fff;       font-weight: 500;"
                  ) cancelado
              template(
                v-if="orders.status==='recebido'"
              )
                q-btn(
                  color="green"
                  unelevated
                )
                  span(
                    style="color: #fff;       font-weight: 500;"
                  ) Recebido
              a.subtitulo(
                style="font-weight: 300; cursor:  pointer; margin-top: 2px;"
              ) Repetir Pedido
            div.column
              p.subtitulo N PEDIDO: {{ orders.id }}
              a.subtitulo(
                style="font-weight: 300; cursor:  pointer;"
                @click="searchDetails(orders.id)"
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
                    p.subtitulo {{ formatCurrency(item. valor) }}
            q-btn(
              color="black"
              style="height: 50px; width: 300px;"
            )
              span(
                style="color: #fff;font-weight: 500;"
              ) Comprar novamente
  template(
    v-if="detalhes==='2'"
  )
    template(
      v-for="orders in order"
      :key="orders"
    )
      template(
        v-if="orders.id = idpedido"
      )
        div.interno
          div.input
            div.infos
              div.column
                p.subtitulo Endereço
                span {{ orders.endereco.logradouro }}, {{ orders.endereco.numero }}
                span {{ orders.endereco.bairro }}
                span {{ orders.endereco.cidade }}, {{ orders.endereco.uf }}
                span {{ orders.endereco.cep }}
              div.column(
                style="margin-right: 10px"
              )
                p.subtitulo Formas de Pagamento
                span {{ datadetails.meioPagamento }}
              div.column
                p.subtitulo Resumo do Pedido
                span Subtotal: {{ formatCurrency(orders.valorInicial) }}
                span Frete: {{ formatCurrency(orders.valorFrete) }}
                q-separator(color="black")
                span.subtitulo Total: {{ formatCurrency(orders.valorFinal) }}
            div.infos
              p.subtitulo Status do Pedido {{ orders.id }}
              template(
                v-if="orders.status==='aguardando'"
              )
                q-btn(
                  color="blue"
                  unelevated
                )
                  span(
                    style="color: #fff;       font-weight: 500;"
                  ) Aguardando
              template(
                v-if="orders.status==='cancelado'"
              )
                q-btn(
                  color="red"
                  unelevated
                )
                  span(
                    style="color: #fff;       font-weight: 500;"
                  ) cancelado
              template(
                v-if="orders.status==='recebido'"
              )
                q-btn(
                  color="green"
                  unelevated
                )
                  span(
                    style="color: #fff;       font-weight: 500;"
                  ) Recebido
            div.infos
              div.column
                p.subtitulo Produtos
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
                      p.subtitulo Quantidade: {{ item.  qtdVendida }}
    div.interno
      div.input
        q-btn(
          color="black"
          @click="detalhes='1'"
        )
          span Voltar para todos os pedidos
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
  padding: 15px;
  border: 1px solid rgba(3,3,3,0.2);
  background-color: rgba(200,200,200,0.1);
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
  color: #000;
  text-decoration: underline;
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
