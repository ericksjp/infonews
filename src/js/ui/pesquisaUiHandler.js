import apiService from "../services/newsApiService";
import { criarElemento } from "../util/generic";
import { modalNews } from "../util/globalTags";
import { loader } from "../util/homeTags";
import {
  noResultsFoundIndicator,
  searchValueIndicator,
} from "../util/pesquisaTags";

const criarElementoPesquisa = (article) => {
  const { title, description, author, publishedAt, urlToImage, url } = article;
  // Create the main article container

  const noticia = criarElemento("div", {
    classe: "article",
  });

  noticia.addEventListener("click", () => {
    modalNews.create(article);
  });

  const imageDiv = criarElemento("div", {
    classe: "imageDiv",
    atributos: {
      style: `
      background-image: url("/assets/News-Placeholder.webp");
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
    `,
    },
  });

  const image = urlToImage ? new Image() : null;
  if (image) {
    image.src = urlToImage;
    image.onload = () => {
      imageDiv.style.backgroundImage = `url(${urlToImage})`;
    };
  }
  noticia.appendChild(imageDiv);

  const contentDiv = criarElemento("div", { classe: "content" });

  // Create the title element
  const titleElement = criarElemento("h2", { conteudoTexto: title });
  contentDiv.appendChild(titleElement);

  let sliced = description.slice(0, 150);
  if (sliced.length === 150) sliced += "...";
  const descriptionElement = criarElemento("p", { conteudoTexto: sliced });
  contentDiv.appendChild(descriptionElement);

  // Create the author and date element
  const publishedDate = new Date(publishedAt).toLocaleDateString();

  let authorSliced =
    (author && author.slice(0, 100).replaceAll("\n", "")) || "Unknown";
  const metaElement = criarElemento("span", {
    conteudoTexto: `Por ${authorSliced} em ${publishedDate || ""}`,
  });
  contentDiv.appendChild(metaElement);

  // Create the link element
  const linkElement = criarElemento("a", {
    atributos: {},
    conteudoTexto: "Read more",
  });

  contentDiv.appendChild(linkElement);
  noticia.appendChild(contentDiv);

  return noticia;
};

const adicionarPesquisas = (articles) => {
  const newsResults = document.getElementById("newsResults");
  newsResults.replaceChildren();

  if (articles.length === 0) {
    noResultsFoundIndicator.classList.remove("hidden");
  } else {
    noResultsFoundIndicator.classList.add("hidden");
    const elements = articles.map(criarElementoPesquisa);
    newsResults.append(...elements);
  }
};

export async function carregarPesquisas(query) {
  let cached = apiService.getQueryNewsFromCache(query);
  if (cached) return adicionarPesquisas(cached);

  // loader.classList.remove("hidden")
  loader.style.opacity = "1";
  const pesquisas = await apiService.queryNews(query);
  adicionarPesquisas(pesquisas);
  searchValueIndicator.classList.remove("hidden");
  searchValueIndicator.textContent = "Showing results for: " + query;
  loader.style.opacity = "0";
}
