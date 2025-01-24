// Esse arquivo contem os listeners que serão aplicados a todas as paginas do site.
import {
  header,
  title,
  hamburger,
  nav_menu,
  nav_items,
} from "../util/globalTags.js";
import apiService from "../services/newsApiService.js";
import { adicionarNoticias } from "../ui/homeUiHandler.js";

nav_items.forEach((e) => {
  e.addEventListener("click", async () => {
    if (e.classList.contains("current-selected-item")) return;
    document
      .querySelector(".current-selected-item")
      .classList.remove("current-selected-item");
    e.classList.add("current-selected-item");

    // se o usuario nao estiver na home, seta um atributo no sessionStorage indicando em qual
    // item ele clickou e redireciona pra home
    if (window.location.pathname !== "/index.html") {
      sessionStorage.setItem("current-news-page", e.id);
      window.location.href = "/index.html";
    } else {
      const news = await apiService.getNewsByCategory(e.id);
      adicionarNoticias(news);
    }
  });
});

// Make the header hide when scrolling
window.addEventListener("scroll", () => {
  if (window.scrollY > header.offsetHeight) {
    if (window.innerWidth > 769) title.style.fontSize = "var(--font-size-xl)";
    header.classList.add("sticky-header");
  } else {
    header.classList.remove("sticky-header");
    title.style.fontSize = "var(--font-size-title)";
  }
});

// abre e fecha o menu ao clicar no hamburger
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  nav_menu.classList.toggle("active");
});

// fecha o menu ao clicar em um link ou fora do menu
document.addEventListener("click", (event) => {
  if (
    (!hamburger.contains(event.target) && !nav_menu.contains(event.target)) ||
    event.target.classList.contains("nav-link")
  ) {
    hamburger.classList.remove("active");
    nav_menu.classList.remove("active");
  }
});

// realiza a pesquisa com base no que foi escrito
document.getElementById('input-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const query = document.getElementById('searchInput').value;
  localStorage.setItem('searchQuery', query);
  window.location.href = 'pesquisa.html';
});
