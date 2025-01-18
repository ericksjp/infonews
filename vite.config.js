/* eslint-disable no-undef */
// vite.config.js

import { ViteMinifyPlugin } from "vite-plugin-minify";
import { sync } from "glob";
import { resolve } from "path";

export default {
  resolve: {
    alias: {
      "@js": resolve(__dirname, "./src/assets/js"),
      "@css": resolve(__dirname, "./src/assets/css"),
    },
  },
  plugins: [ViteMinifyPlugin()],
  appType: "mpa",
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: sync("./src/**/*.html".replace(/\\/g, "/")),
    },
  },
};
