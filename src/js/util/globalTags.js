import { ModalNews } from "./createmodalNews";

// Esse arquivo contem as tags que são usadas em todas as páginas do site.
export const header = document.querySelector("header");
export const title = document.querySelector("#ifn-title");
export const hamburger = document.querySelector(".hamburger");
export const nav_menu = document.querySelector(".nav-menu");
export const nav_links = document.querySelectorAll(".nav-link");
export const backToTopButton = document.querySelector("#back-to-top");
export const current_selected_nav_item = document.querySelector(
  ".current-selected-item",
);
export const modalNews = new ModalNews();
