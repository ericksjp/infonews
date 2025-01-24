import { carregarNoticias } from "./ui/homeUiHandler.js";
import "./listeners/globalListeners.js";
import "./listeners/homeListener.js";

document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0);
});

(async () => {
  let category = sessionStorage.getItem("current-news-page");
  if (category) {
    sessionStorage.removeItem("current-news-page");
    document.querySelector("#general").parentElement.classList.remove("current-selected-item");
    const el = document.querySelector("#" + category);
    el.parentElement.classList.add("current-selected-item");
  }
  else category = "general";

  try {
    carregarNoticias(category);
  } catch (error) {
    console.error(error);
  }
})();
