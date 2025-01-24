import { noticiasRegularesSection } from "../util/homeTags";
import { pesquisaForm, pesquisaInput } from "../util/pesquisaTags";

const breakpoint = 1020;

const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);

function handleWidthChange(e) {
  const elements = Array.from(noticiasRegularesSection.children).slice(0, 2);

  if (e.matches) {
    elements.forEach((element) => {
      element.classList.remove("hidden");
    });
  } else {
    elements.forEach((element) => {
      element.classList.add("hidden");
    });
  }
}

mediaQuery.addEventListener("change", handleWidthChange);
handleWidthChange(mediaQuery);

pesquisaForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = pesquisaInput.value;
  window.location.href = `/pesquisa.html?query=${val}`;
});
