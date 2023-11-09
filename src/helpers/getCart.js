import axios from "axios";
import { LocalStorage } from "quasar";

async function getCart () {
  try {
    const cartId = LocalStorage.getItem("cartIdBackend") || -1;
    const clientId = LocalStorage.getItem("idclient");
    let quantidadeCarrinho = 0; // Resetando para 0 a cada chamada

    const response = await axios.post(`https://mitaoficial.elevarcommerceapi.com.br/HandoverMetasWS/webapi/handover/portal/cartService/getCart/${cartId}/${clientId}`);

    const items = response.data.items || [];

    quantidadeCarrinho = items.reduce((total, item) => total + item.quantity, quantidadeCarrinho);

    LocalStorage.set("quantidadeCarrinho", quantidadeCarrinho);
  } catch (err) {
    console.error(err);
  }
}

export default getCart;
