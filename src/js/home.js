import { adicionarNoticias } from "./ui/homeUiHandler.js";
import "./listeners/globalListeners.js";
import apiService from "./services/newsApiService.js";

document.addEventListener("DOMContentLoaded", function () {
  window.scrollTo(0, 0);
});

(async () => {
  let category = sessionStorage.getItem("current-news-page");
  if (category) {
    sessionStorage.removeItem("current-news-page");
  }
  category = "general";
  try {
    const news = await apiService.getNewsByCategory(category);
    adicionarNoticias(news);
  } catch (error) {
    console.error(error);
  }
})();
