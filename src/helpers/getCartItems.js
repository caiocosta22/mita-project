import axios from "axios";
import { useQuasar } from "quasar";
const $q = useQuasar();

export default async function getCartItems () {
  const cartId = $q.localStorage.getItem("cartIdBackend") || undefined;
  let cartItems = [];
  let quantidadeCarrinho = $q.localStorage.getItem("quantidadeCarrinho") || 0;
  $q.localStorage.set("quantidadeCarrinho", quantidadeCarrinho);
  try {
    if (cartId) {
      const cart = await axios.post(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/cartService/getCart/${cartId}/-1`);
      cartItems = cart.data || cart.response.data;
      if (cartItems !== "Nenhum carrinho válido encontrado") {
        quantidadeCarrinho = cartItems.items?.length;
        $q.localStorage.set("quantidadeCarrinho", quantidadeCarrinho);
      }
    }
  } catch (e) {
    throw new Error(e);
  }
}
