import apiService from "../services/newsApiService";
import { criarElemento } from "../util/generic";
import { loader } from "../util/homeTags";
import { noResultsFoundIndicator, searchValueIndicator } from "../util/pesquisaTags";

const criarElementoPesquisa = (article) => {
  const {title, description, author, publishedAt, urlToImage, url} = article;
  // Create the main article container

  const noticia = criarElemento("div", {
    classe: "article",
  });

  const imageDiv = criarElemento("div", {
    classe: "imageDiv",
    atributos: {
      style: `
      background-image: url("../../assets/News-Placeholder.webp");
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

  // // Create the image element
  // const imageElement = criarElemento("img", {
  //   atributos: {
  //     src: article.urlToImage || "../../assets/News-Placeholder.webp",
  //     alt: "News Image"
  //   }
  // });
  // articleElement.appendChild(imageElement);

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

  let authorSliced = author && author.slice(0, 100).replaceAll("\n", "") || "Unknown";
  const metaElement = criarElemento("span", { conteudoTexto: `Por ${authorSliced} em ${publishedDate || ""}` });
  contentDiv.appendChild(metaElement);

  // Create the link element
  const linkElement = criarElemento("a", {
    atributos: {
      href: url,
      target: "_blank"
    },
    conteudoTexto: "Read more"
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

  loader.classList.remove("hidden")
  const pesquisas = await apiService.queryNews(query);
  adicionarPesquisas(pesquisas);
  searchValueIndicator.classList.remove("hidden");
  searchValueIndicator.textContent = "Showing results for: " + query;
  loader.classList.add("hidden")
}
