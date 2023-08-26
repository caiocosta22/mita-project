import { boot } from "quasar/wrappers";
import axios from "axios";

async function buscarConfigsGlobais () {
  try {
    return await axios.get("/api/configuracaoService/getConfiguracao/todas");
  } catch (e) {
    console.log("Erro ao carregar configurações globais");
    return {};
  }
}

export default boot(async ({ app }) => {
  const configs = await buscarConfigsGlobais();
  app.provide("configsGlobais", configs);
});
