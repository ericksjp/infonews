import { getRelatedNews } from "../services/modalNewsApiService";
import { criarNoticiaRegular } from "../ui/homeUiHandler";
import { getTimePassed } from "./generic";

export class ModalNews {
  constructor() {
    this.currentNoticia;
    this.body = document.body;
    this.stack = [];
  }
  create(currentNoticia) {
    this.currentNoticia = currentNoticia;

    this.body.classList.add("modal-aberto");

    const modal = document.createElement("div");
    modal.classList.add("modal-noticia");

    this.stack.push(modal);

    this.renderHeader(modal);

    this.renderBody(modal);
    //document.createElement("")

    this.body.appendChild(modal);
  }

  renderHeader(modal) {
    const headerModal = document.createElement("div");
    headerModal.classList.add("modal-noticia-header");

    if (this.stack.length > 1) {
      const iconBackToBeforeModalNews = document.createElement("i");
      iconBackToBeforeModalNews.className = "bx bx-left-arrow-alt";
      iconBackToBeforeModalNews.classList.add("icon-close");

      iconBackToBeforeModalNews.addEventListener("click", () =>
        this.removeLast()
      );

      headerModal.appendChild(iconBackToBeforeModalNews);
    }

    if (this.currentNoticia?.title) {
      const title = document.createElement("p");
      title.textContent = this.currentNoticia.title.slice(0, 150) + "...";

      headerModal.appendChild(title);
    }

    const iconCloseModal = document.createElement("i");
    iconCloseModal.className = "bx bx-x";
    iconCloseModal.classList.add("icon-close");

    iconCloseModal.addEventListener("click", () => {
      this.removeAll();
    });

    headerModal.appendChild(iconCloseModal);

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

    const imageNoticia = document.createElement("img");
    imageNoticia.src = this.currentNoticia?.urlToImage
      ? this.currentNoticia?.urlToImage
      : "../../assets/News-Placeholder.webp";

    conteinerNoticia.appendChild(imageNoticia);

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

    this.RenderRelatedNews(conteinerNoticia);

    bodyModal.appendChild(conteinerNoticia);
    modal.appendChild(bodyModal);
  }

  async RenderRelatedNews(conteinerNoticia) {
    try {
      const name = this.currentNoticia?.source?.name
        ? this.currentNoticia?.source?.name
        : this.currentNoticia?.source?.id;
      const articles = await getRelatedNews(name, 5);

      if (articles && articles.length > 0) {
        const paragrafoRelatedNews = document.createElement("p");
        paragrafoRelatedNews.textContent = "Related news";
        paragrafoRelatedNews.classList.add("related-news");

        conteinerNoticia.appendChild(paragrafoRelatedNews);

        const conteinerRelatedResults = document.createElement("div");
        conteinerRelatedResults.classList.add("related-news-results");

        const elementos = articles.map(criarNoticiaRegular);
        conteinerRelatedResults.replaceChildren(...elementos);

        conteinerNoticia.appendChild(conteinerRelatedResults);
      }
    } catch (error) {
      console.error(error);
    }
  }

  removeLast() {
    if (this.stack.length > 0) {
      const modal = this.stack.pop(); // Remove o último modal da pilha
      modal.classList.add("hide");
      setTimeout(() => {
        modal.remove();
      }, 200);
    }

    if (this.stack.length === 0) {
      this.body.classList.remove("modal-aberto"); // Remove a classe se não houver mais modais
    }
  }

  removeAll() {
    while (this.stack.length > 0) {
      this.removeLast(); // Remove os modais um por um
    }
  }
}
