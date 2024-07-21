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
        //product: resolve(__dirname, "src/product_pages/index.html"),
        //checkout: resolve(__dirname, "src/checkout/index.html"),
        //success: resolve(__dirname, "src/checkout/success.html"),
        //product_listing: resolve(__dirname, "src/product-listing/index.html"),
      },
    },
  },
});

// Create new path: the key e.g.: fixture
