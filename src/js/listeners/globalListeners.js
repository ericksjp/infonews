// Esse arquivo contem os listeners que serão aplicados a todas as paginas do site.
import {
  header,
  title,
  hamburger,
  nav_menu,
  nav_links,
  backToTopButton,
} from "../util/globalTags.js";
import { handleNavLinkClick } from "../ui/homeUiHandler.js";

nav_links.forEach((e) => {
  e.addEventListener("click", () => handleNavLinkClick(e));
});

const headerHeight = header.offsetHeight;

window.addEventListener("scroll", () => {
  if (window.scrollY > headerHeight) {
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

// Adicionar o clique
backToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
