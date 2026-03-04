import { defineConfig } from "vite";
import { resolve } from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, "index.html"),
                sass: resolve(__dirname, "sass.html"),
            },
        },
    },
plugins: [
        ViteImageOptimizer({
            jpg: {
                quality: 80,
            },
            png: {
                quality: 80,
            },
            webp: {
                quality: 80,
            },
        }),
    ],
})

