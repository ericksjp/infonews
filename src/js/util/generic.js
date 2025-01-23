export function getTimePassed(publishedAt) {
  const currentTime = new Date();
  const publicationTime = new Date(publishedAt);

  const timeDifference = currentTime - publicationTime;

  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} day${days === 1 ? "" : "s"} ago`;
  } else if (hours > 0) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  } else if (minutes > 0) {
    return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
  } else {
    return `${seconds} second${seconds === 1 ? "" : "s"} ago`;
  }
}

/**
 * Função auxiliar para criar um elemento com atributos e conteúdo
 */
export function criarElemento(tag, { classe, atributos = {}, conteudoHTML = "", conteudoTexto = "" } = {}) {
  const elemento = document.createElement(tag);
  if (classe) elemento.className = classe;
  if (conteudoHTML) elemento.innerHTML = conteudoHTML;
  if (conteudoTexto) elemento.innerText = conteudoTexto;
  Object.entries(atributos).forEach(([chave, valor]) => elemento.setAttribute(chave, valor));
  return elemento;
}
