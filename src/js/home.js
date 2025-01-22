import "./listeners/globalListeners.js";
import { createModalNoticia } from "./util/createmodalNews.js";
import noticias from "./util/mockData.js";

const openModal = document.querySelector("#openModal");

openModal.addEventListener("click", () => {
  createModalNoticia(noticias.all.articles, 3, noticias.all.articles.length);
});
