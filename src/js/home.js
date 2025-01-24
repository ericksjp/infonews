import { carregarNoticias } from "./ui/homeUiHandler.js";
import "./listeners/globalListeners.js";
import "./listeners/homeListener.js";

document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0);
});

(async () => {
  let category = sessionStorage.getItem("current-news-page");
  if (category) sessionStorage.removeItem("current-news-page");
  else category = "general";

  try {
    carregarNoticias(category);
  } catch (error) {
    console.error(error);
  }
})();
