export class ModalNews {
  constructor(arrayNews, size) {
    this.news = arrayNews;
    this.sizeNews = size;
    this.body = document.body;

    this.currentNoticia;
    this.nextNoticia;
    this.previousNoticia;
  }

  create(index) {
    this.body.classList.add("modal-aberto");

    this.currentNoticia = this.news[index];

    this.nextNoticia = index >= this.sizeNews - 1 ? null : this.news[index + 1];

    this.previousNoticia = index <= 0 ? null : this.news[index - 1];

    const modal = document.createElement("div");
    modal.classList.add("modal-noticia");

    this.renderHeader(modal);

    this.renderBody(modal);
    //document.createElement("")

    this.body.appendChild(modal);
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
      const dateFormated = new Date(
        this.currentNoticia.publishedAt
      ).toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      const publishedAt = document.createElement("p");
      publishedAt.textContent = dateFormated;
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

      const btnShowMoreContent = document.createElement("button");
      btnShowMoreContent.textContent = "Show content complete";

      const iconShowMoreContent = document.createElement("i");
      iconShowMoreContent.className = "bx bx-chevron-down";

      btnShowMoreContent.appendChild(iconShowMoreContent);
      linkFullContent.appendChild(btnShowMoreContent);
      conteinerInfoNews.appendChild(linkFullContent);
    }

    conteinerNoticia.appendChild(conteinerInfoNews);
    bodyModal.appendChild(conteinerNoticia);
    modal.appendChild(bodyModal);
  }

  remove(modal) {
    this.body.classList.remove("modal-aberto");
    modal.classList.add("hide");
    setTimeout(() => {
      modal.remove();
    }, 200);
  }
}
