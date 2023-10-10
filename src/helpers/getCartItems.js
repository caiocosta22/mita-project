import axios from "axios";
import { LocalStorage } from "quasar";

async function getCartItems () {
  const cartId = LocalStorage.getItem("cartIdBackend") || undefined;
  let cartItems = [];
  let quantidadeCarrinho = LocalStorage.getItem("quantidadeCarrinho") || 0;
  LocalStorage.set("quantidadeCarrinho", quantidadeCarrinho);
  try {
    if (cartId) {
      const cart = await axios.post(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/cartService/getCart/${cartId}/-1`);
      cartItems = cart.data || cart.response.data;
      if (cartItems !== "Nenhum carrinho válido encontrado") {
        quantidadeCarrinho = cartItems.items?.length;
        LocalStorage.set("quantidadeCarrinho", quantidadeCarrinho);
      }
    }
  } catch (e) {
    throw new Error(e);
  }
}

export default getCartItems;
