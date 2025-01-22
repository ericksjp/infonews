import { adicionarNoticias } from "./ui/homeUiHandler.js";
import "./listeners/globalListeners.js";
import noticias from "./util/mockData.js";

(() => {
  adicionarNoticias(noticias.all.articles);
})();
