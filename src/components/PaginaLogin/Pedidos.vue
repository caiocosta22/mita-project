<script setup>
import { computed, ref } from "vue";
import { useQuasar, LocalStorage } from "quasar";
import getCart from "src/helpers/getCart";
import axios from "axios";

const $q = useQuasar();
const token = $q.localStorage.getItem("token");
const idClient = LocalStorage.getItem("idclient"); ;
let cartId = LocalStorage.getItem("cartIdBackend") || -1;

const emitAddToCartEvent = () => {
  const addToCartEvent = new CustomEvent("addToCart", {
    detail: { quantity: LocalStorage.getItem("quantidadeCarrinho") }
  });
  window.dispatchEvent(addToCartEvent);
};

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
const produto = ref();
const quantidadeproduto = ref();

async function verifyItem () {
  try {
    const items = LocalStorage.getItem("itemsCarrinho");
    const itemEncontrado = items.find(item => item.itemVenda.id === produto.value);
    quantidadeproduto.value = itemEncontrado.quantity;
    return !!itemEncontrado;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function createCart (item, quantidade) {
  try {
    const response = await axios.post(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/cartService/getCart/-1/${idClient}`, {
      productId: produto.value,
      quantity: quantidadeproduto.value
    });
    if (response.status === 200) {
      cartId = response.data.id;
      LocalStorage.set("cartIdBackend", cartId);
      await getCart();
      emitAddToCartEvent();
      $q.notify({
        color: "green",
        textColor: "white",
        icon: "check",
        message: "Carrinho criado com sucesso."
      });
    } else {
      $q.notify({
        color: "red",
        textColor: "white",
        icon: "warning",
        message: "Erro ao criar carrinho, tente recarregar a página."
      });
      console.log("Status da requisição, ", response.status);
      console.log("Resposta da requisição, ", response.response);
    }
  } catch (error) {
    console.log(error);
  }
}

async function addProductToCart (item, quantidade) {
  produto.value = item;
  quantidadeproduto.value = quantidade;
  try {
    $q.notify({
      color: "blue",
      textColor: "white",
      icon: "loading",
      spinner: true,
      message: "Por favor, aguarde"
    });
    if (cartId === -1) {
      await createCart(produto.value, quantidadeproduto.value);
    } else {
      const itemExiste = await verifyItem(item, quantidade);
      if (!itemExiste) {
        const add = await axios.post(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/cartService/addCartItem/${cartId}`, {
          quantity: quantidadeproduto.value,
          productId: produto.value
        });
        if (add.status === 200) {
          await getCart();
          emitAddToCartEvent();
          $q.notify({
            color: "green",
            textColor: "white",
            icon: "check",
            message: "Item adicionado com sucesso."
          });
          console.log("Resposta da requisicao sucedida, ", add.response);
        } else {
          console.log("Status da requisicao, ", add.status);
          console.log("Resposta da requisicao, ", add.response);
          $q.notify({
            color: "red",
            textColor: "white",
            icon: "warning",
            message: "Erro ao adicionar item. tente recarregar a página"
          });
        }
      } else {
        const add = await axios.post(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/cartService/addCartItem/${cartId}`, {
          productId: produto.value,
          quantity: (quantidadeproduto.value + 1)
        });
        $q.notify({
          color: "green",
          textColor: "white",
          icon: "check",
          message: "Item já no carrinho, adicionada mais 1 unidade."
        });
        if (add.status === 200) {
          await getCart();
          emitAddToCartEvent();
        } else {
          $q.notify({
            color: "green",
            textColor: "white",
            icon: "check",
            message: "Falha ao atualizar item. Tente recarregar a página"
          });
          console.log("Status da atualizacao, ", add.status);
          console.log("Resposta da atualizacao, ", add.response);
        }
      }
    }
  } catch (error) {
    console.log(error);
    await createCart();
  }
};

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
            div.column(
              style="width:100%;"
            )
              template(
                v-for="item in orders.itemPedido"
                :key="item"
              )
                div.infos#produto(
                  style="  padding: 0px;border: 0px;background-color: rgba(200,200,200,0); width: 100%;"
                )
                  div.flex.row
                    div.produto
                      img(
                        :src="item.foto"
                      )
                    div.column(
                      style="margin-left: 15px;"
                    )
                      p.subtitulo {{ item.descricao }}
                      p.subtitulo {{ formatCurrency(item. valor) }}
                  q-btn(
                    color="black"
                    style="height: 50px; width: 100px;"
                    @click="addProductToCart(item.id,item.qtdVendida)"
                  )
                    span(
                      style="color: #fff;font-weight: 500; font-size: 12px; line-height: 1.4;"
                    ) Comprar <br> novamente
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
img {
  max-width: 100%;
  display: block;
  height: inherit;
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
