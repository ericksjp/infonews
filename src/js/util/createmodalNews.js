import { criarNoticiaRegular } from "../ui/homeUiHandler";
import { getTimePassed } from "./generic";
import noticias from "./mockData";

export class ModalNews {
  constructor() {
    this.currentNoticia;
    this.body = document.body;
  }
  create(currentNoticia) {
    this.currentNoticia = currentNoticia;

    let modal = document.querySelector(".modal-noticia");

    if (modal) {
      this.updateContent(modal);
      return;
    }

    this.body.classList.add("modal-aberto");

    modal = document.createElement("div");
    modal.classList.add("modal-noticia");

    this.renderHeader(modal);

    this.renderBody(modal);
    //document.createElement("")

    this.body.appendChild(modal);
  }

  updateContent(modal) {
    // Limpa o conteúdo atual do modal
    modal.innerHTML = "";

    // Renderiza novamente o modal com os novos dados
    this.renderHeader(modal);
    this.renderBody(modal);
  }

  renderHeader(modal) {
    const headerModal = document.createElement("div");
    headerModal.classList.add("modal-noticia-header");

    const iconCloseModal = document.createElement("i");
    iconCloseModal.className = "bx bx-x";
    iconCloseModal.classList.add("icon-close");

    iconCloseModal.addEventListener("click", () => {
      this.remove(modal);
    });

    headerModal.appendChild(iconCloseModal);

    if (this.currentNoticia?.title) {
      const title = document.createElement("p");
      title.textContent = this.currentNoticia.title;

      headerModal.appendChild(title);
    }

    modal.appendChild(headerModal);
  }

  renderBody(modal) {
    const bodyModal = document.createElement("div");
    bodyModal.classList.add("modal-noticia-body");

    const conteinerNoticia = document.createElement("div");
    conteinerNoticia.classList.add("conteiner-central-noticia");

    if (this.currentNoticia?.title) {
      const titleH1 = document.createElement("h1");
      titleH1.textContent = this.currentNoticia.title;

      conteinerNoticia.appendChild(titleH1);
    }

    const conteinerAuthorAndDate = document.createElement("div");

    if (this.currentNoticia?.author) {
      const nameAuthor = document.createElement("p");
      nameAuthor.textContent = `By: ${this.currentNoticia.author}`;
      nameAuthor.classList.add("name-author");

      conteinerAuthorAndDate.appendChild(nameAuthor);
    }

    if (this.currentNoticia?.publishedAt) {
      const publishedAt = document.createElement("p");
      publishedAt.textContent = getTimePassed(this.currentNoticia.publishedAt);
      publishedAt.classList.add("published-at");

      conteinerAuthorAndDate.appendChild(publishedAt);
    }

    conteinerNoticia.appendChild(conteinerAuthorAndDate);

    if (this.currentNoticia?.urlToImage) {
      const imageNoticia = document.createElement("img");
      imageNoticia.src = this.currentNoticia.urlToImage;

      conteinerNoticia.appendChild(imageNoticia);
    }

    if (this.currentNoticia?.description) {
      const description = document.createElement("p");
      description.textContent = this.currentNoticia.description;
      description.classList.add("description");

      conteinerNoticia.appendChild(description);
    }

    const conteinerInfoNews = document.createElement("div");
    conteinerInfoNews.classList.add("text-with-bars");

    if (this.currentNoticia?.url) {
      const linkFullContent = document.createElement("a");
      linkFullContent.href = this.currentNoticia.url;
      linkFullContent.target = "_blank";
      linkFullContent.textContent = "Show content complete";

      const iconShowMoreContent = document.createElement("i");
      iconShowMoreContent.className = "bx bx-chevron-down";

      linkFullContent.appendChild(iconShowMoreContent);
      conteinerInfoNews.appendChild(linkFullContent);
    }

    conteinerNoticia.appendChild(conteinerInfoNews);

    this.relatedNews(conteinerNoticia);

    bodyModal.appendChild(conteinerNoticia);
    modal.appendChild(bodyModal);
  }

  relatedNews(conteinerNoticia) {
    const paragrafoRelatedNews = document.createElement("p");
    paragrafoRelatedNews.textContent = "Related news";
    paragrafoRelatedNews.classList.add("related-news");

    const conteinerRelatedResults = document.createElement("div");

    const elementos = noticias.all.articles
      .slice(0, 5)
      .map(criarNoticiaRegular);
    conteinerRelatedResults.replaceChildren(...elementos);

    conteinerNoticia.appendChild(paragrafoRelatedNews);
    conteinerNoticia.appendChild(conteinerRelatedResults);
  }

  remove(modal) {
    this.body.classList.remove("modal-aberto");
    modal.classList.add("hide");
    setTimeout(() => {
      modal.remove();
    }, 200);
  }
}
