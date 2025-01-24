import { getTimePassed, criarElemento } from "../util/generic.js";
import { modalNews } from "../util/globalTags.js";
import {
  noticiasDestaqueSection,
  noticiasRegularesSection,
  noticiasSecundariasDiv,
} from "../util/homeTags.js";

function criarInfoNoticia(author, publishedAt) {
  const divInformacoes = criarElemento("div", {
    classe: "noticia-informacoes",
  });

  const autor = criarElemento("span", {
    classe: "noticia-autor",
    conteudoHTML: `By: ${author || "Unknown"}`,
  });

  const tempo = criarElemento("time", {
    classe: "notica-dataPublicacao",
    atributos: { dateTime: publishedAt },
    conteudoTexto: (publishedAt && getTimePassed(publishedAt)) || "Unknown",
  });

  divInformacoes.appendChild(autor);
  divInformacoes.appendChild(tempo);

  return divInformacoes;
}

export function criarNoticiaRegular(dadosnoticia) {
  const { urlToImage, title, description, author, publishedAt } = dadosnoticia;

  const noticia = criarElemento("noticia", {
    classe: "noticia-regular flex-row",
  });

  noticia.addEventListener("click", () => {
    modalNews.create(dadosnoticia);
  });

  const imagem = criarElemento("img", {
    classe: "noticia-imagem border-radius",
    atributos: {
      src: urlToImage || "../../assets/News-Placeholder.webp",
      alt: "",
      style: `
        background-image: url(../../assets/News-Placeholder.webp);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
`,
    },
  });

  const divAreaTexto = criarElemento("div", { classe: "area-texto-noticia" });
  const linkElement = criarElemento("a", {
    classe: "noticia-link",
    conteudoHTML: title,
  });

  const descriptionElemento = criarElemento("p", {
    classe: "noticia-descricao",
    conteudoHTML: description,
  });

  divAreaTexto.appendChild(linkElement);
  divAreaTexto.appendChild(descriptionElemento);

  const divInformacoes = criarInfoNoticia(author, publishedAt);

  const divAreaDireita = criarElemento("div", { classe: "noticia-rightDiv" });
  divAreaDireita.appendChild(divAreaTexto);
  divAreaDireita.appendChild(divInformacoes);

  noticia.appendChild(imagem);
  noticia.appendChild(divAreaDireita);

  return noticia;
}

function criarNoticiaPrincipalOuSecundaria(ePrincipal, dadosnoticia) {
  const { urlToImage, title, description, author, publishedAt } = dadosnoticia;

  const noticia = criarElemento("article", {
    classe: `noticia ${!ePrincipal && "noticia-secundaria"}`,
    atributos: {
      style: `background-image: url("../../assets/News-Placeholder.webp");`,
    },
  });

  noticia.addEventListener("click", () => {
    modalNews.create(dadosnoticia);
  });

  const image = urlToImage ? new Image() : null;
  if (image) {
    image.src = urlToImage;
    image.onload = () => {
      noticia.style.backgroundImage = `url(${urlToImage})`;
    };
  }

  if (ePrincipal) noticia.id = "noticia-principal";

  const divAreaTexto = criarElemento("div", { classe: "noticia-areaTexto" });
  const titleElemento = criarElemento("h3", {
    classe: "noticia-titulo",
    conteudoHTML: title,
  });
  const descriptionElemento = criarElemento("p", {
    classe: "noticia-descricao",
    conteudoHTML: description,
  });

  divAreaTexto.appendChild(titleElemento);
  divAreaTexto.appendChild(descriptionElemento);

  const divInformacoes = criarInfoNoticia(author, publishedAt);
  divAreaTexto.appendChild(divInformacoes);

  noticia.appendChild(divAreaTexto);

  return noticia;
}

function adicionarNoticiasSessaoRegular(noticias) {
  const elementos = noticias.map(criarNoticiaRegular);
  noticiasRegularesSection.replaceChildren(...elementos);
}

function adicionarNoticiasSessaoPrincipal(noticias) {
  const noticiaPrincipal = criarNoticiaPrincipalOuSecundaria(
    true,
    noticias.shift()
  );
  noticiasDestaqueSection.replaceChildren(noticiaPrincipal);

  if (noticias.length === 0) {
    console.log(noticiasDestaqueSection);
    return noticiasDestaqueSection.classList.add("noticia-principal-only");
  }

  const noticiasSecundarias = noticias.map((noticia) =>
    criarNoticiaPrincipalOuSecundaria(false, noticia)
  );
  const elemento = criarElemento("div", {
    classe: `noticiasSecundarias-${noticias.length}`,
  });
  elemento.id = "noticiasSecundarias-div";
  elemento.replaceChildren(...noticiasSecundarias);
  noticiasDestaqueSection.appendChild(elemento);
}

/**
 * Adiciona notícias à interface do usuário.
 *
 * Esta função recebe um array de objetos de notícias e atualiza a interface do
 * usuário exibindo as notícias nas seções apropriadas. Se nenhuma notícia for
 * fornecida, ela exibe uma mensagem indicando que nenhuma notícia foi
 * encontrada.
 *
 * @param {Array} noticias - Um array de objetos de notícias. Cada objeto de notícia deve conter as seguintes propriedades:
 *                           - `urlToImage` (string): URL da imagem da notícia.
 *                           - `title` (string): Título da notícia.
 *                           - `description` (string): Descrição da notícia.
 *                           - `author` (string): Nome do autor da notícia.
 *                           - `publishedAt` (string): Data e hora de publicação da notícia no formato ISO 8601.
 */
export function adicionarNoticias(noticias) {
  if (noticias.length === 0) {
    noticiasDestaqueSection.innerHTML = "<h2>Nenhuma notícia encontrada</h2>";
    // noticiasRegularesSection.innerHTML = "<h2>Nenhuma notícia encontrada</h2>";
    return;
  }

  const noticiasPrincipais = noticias.slice(0, 3);
  const noticiasRegulares = noticias.slice(3);

  adicionarNoticiasSessaoPrincipal(noticiasPrincipais);
  adicionarNoticiasSessaoRegular(noticiasRegulares);
}
