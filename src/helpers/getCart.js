import axios from "axios";
import { LocalStorage } from "quasar";

async function getCart () {
  const cartId = LocalStorage.getItem("cartIdBackend") || -1;
  const clientId = LocalStorage.getItem("idclient");
  try {
    const cart = await axios.post(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/cartService/getCart/${cartId}/${clientId}`);
    const response = cart.data;
    if (response.items) {
      const array = [];
      array.value = response.items;
      let quantidadeCarrinho = 0;
      array.forEach(function (item) {
        quantidadeCarrinho += item.quantity;
      });
      console.log(quantidadeCarrinho);
      LocalStorage.set("quantidadeCarrinho", quantidadeCarrinho);
    } else {
      const quantidadeCarrinho = 0;
      LocalStorage.set("quantidadeCarrinho", quantidadeCarrinho);
    }
  } catch (err) {
    console.log(err);
  }
}

export default getCart;
