import { adicionarNoticias } from "./ui/homeUiHandler.js";
import "./listeners/globalListeners.js";
import { ModalNews } from "./util/createmodalNews.js";
import noticias from "./util/mockData.js";

const modalNewsAllArticles = new ModalNews(
  noticias.all.articles,
  noticias.all.articles.length
);

const openModal = document.querySelector("#openModal");

openModal.addEventListener("click", () => {
  modalNewsAllArticles.create(2);
});

window.addEventListener("DOMContentLoaded", () => {
  fetch(
    "https://newsapi.org/v2/everything?q=cnn&apiKey=23df153f2c7b4529bc4cd27f5d701952"
  )
    .then((data) => data.json())
    .then((result) => console.log(result));
});

(() => {
  adicionarNoticias(noticias.all.articles);
})();
