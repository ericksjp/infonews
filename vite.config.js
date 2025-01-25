// vite.config.js

import { ViteMinifyPlugin } from "vite-plugin-minify";
import { sync } from "glob";

export default {
  plugins: [ViteMinifyPlugin()],
  appType: "mpa",
  root: "./src",
  publicDir: "../public",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: sync("./src/**/*.html".replace(/\\/g, "/")),
    },
  },
};
