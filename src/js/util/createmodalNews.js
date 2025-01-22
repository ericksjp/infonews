export const createModalNoticia = (arrayNoticia, indexNoticia, size) => {
  const currentNoticia = arrayNoticia[indexNoticia];
  const nextNoticia =
    indexNoticia >= size - 1 ? null : arrayNoticia[indexNoticia + 1];
  const previousNoticia =
    indexNoticia <= 0 ? null : arrayNoticia[indexNoticia - 1];

  const body = document.body;

  body.classList.add("modal-aberto");

  const modal = document.createElement("div");
  modal.classList.add("modal-noticia");

  const headerModal = document.createElement("div");
  headerModal.classList.add("modal-noticia-header");

  //document.createElement("")

  const iconCloseModal = document.createElement("i");
  iconCloseModal.className = "bx bx-x";
  iconCloseModal.classList.add("icon-close");

  const title = document.createElement("p");
  title.textContent = currentNoticia?.title
    ? currentNoticia.title
    : "sem titulo";

  const bodyModal = document.createElement("div");
  bodyModal.classList.add("modal-noticia-body");

  const conteinerNoticia = document.createElement("div");
  conteinerNoticia.classList.add("conteiner-central-noticia");

  const titleH1 = document.createElement("h1");
  titleH1.textContent = title.textContent = currentNoticia?.title
    ? currentNoticia.title
    : "sem titulo";

  const pNext = document.createElement("p");
  pNext.textContent = nextNoticia?.title ? nextNoticia.title : "sem titulo";

  const pPrevious = document.createElement("p");
  pPrevious.textContent = previousNoticia?.title
    ? previousNoticia.title
    : "sem titulo";

  iconCloseModal.addEventListener("click", () => {
    body.classList.remove("modal-aberto");
    modal.classList.add("hide");
    setTimeout(() => {
      modal.remove();
    }, 200);
  });

  headerModal.appendChild(iconCloseModal);
  headerModal.appendChild(title);
  modal.appendChild(headerModal);
  conteinerNoticia.appendChild(titleH1);
  conteinerNoticia.appendChild(pNext);
  conteinerNoticia.appendChild(pPrevious);
  bodyModal.appendChild(conteinerNoticia);
  modal.appendChild(bodyModal);
  body.appendChild(modal);
};
