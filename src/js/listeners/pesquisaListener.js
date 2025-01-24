import { carregarPesquisas } from "../ui/pesquisaUiHandler.js";
import { pesquisaForm, pesquisaInput } from "../util/pesquisaTags.js";

pesquisaForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await carregarPesquisas(pesquisaInput.value);
});

(async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const query = urlParams.get("query");
  pesquisaInput.value = query;
  await carregarPesquisas(query);
})();

// nav_links.forEach((e) => {
//   e.addEventListener("click", () => {
//     window.location.href = "/";
//   });
// }
