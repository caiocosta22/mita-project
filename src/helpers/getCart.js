import axios from "axios";
import { LocalStorage } from "quasar";

async function getCart () {
  try {
    const cartId = LocalStorage.getItem("cartIdBackend") || -1;
    const clientId = LocalStorage.getItem("idclient") || -1;
    let quantidadeCarrinho = 0;

    const response = await axios.post(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/cartService/getCart/${cartId}/${clientId}`);

    const items = response.data?.items || [];

    quantidadeCarrinho = items.reduce((total, item) => total + item.quantity, quantidadeCarrinho);

    LocalStorage.set("quantidadeCarrinho", quantidadeCarrinho);
    LocalStorage.set("itemsCarrinho", items);
  } catch (err) {
    console.error("Erro no carrinho, ", err);
  }
}

export default getCart;
