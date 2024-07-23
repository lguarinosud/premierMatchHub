import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        fixture: resolve(__dirname, "src/fixture/index.html"),
        team: resolve(__dirname, "src/team/index.html"),
      },
    },
  },
});
