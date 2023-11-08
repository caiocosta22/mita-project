import axios from "axios";
import { LocalStorage } from "quasar";

async function createCart () {
  let cartId = LocalStorage.getItem("cartIdBackend");
  const clientId = LocalStorage.getItem("idclient");
  if (cartId && clientId) {
    try {
      const cart = await axios.post(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/cartService/getCart/${cartId}/${clientId}`);
      const response = cart.response.data;
      if (response.items) {
        const array = [];
        array.value = response.items;
        let quantidadeCarrinho = 0;
        array.forEach(function (item) {
          quantidadeCarrinho += item.quantity;
        });
        LocalStorage.set("quantidadeCarrinho", quantidadeCarrinho);
      } else {
        const quantidadeCarrinho = 0;
        LocalStorage.set("quantidadeCarrinho", quantidadeCarrinho);
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      cartId = -1;
      const cart = await axios.post(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/ handover/portal/cartService/getCart/${cartId}/${clientId}`);
      const response = cart.response.data;
      if (cart.response.status === 200) {
        cartId = response.id;
        if (response.items) {
          const array = [];
          array.value = response.items;
          let quantidadeCarrinho = 0;
          array.forEach(function (item) {
            quantidadeCarrinho += item.quantity;
          });
          LocalStorage.set("quantidadeCarrinho", quantidadeCarrinho);
        } else {
          const quantidadeCarrinho = 0;
          LocalStorage.set("quantidadeCarrinho", quantidadeCarrinho);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default createCart;
