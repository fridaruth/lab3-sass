import { defineConfig } from "vite";
import { resolve } from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: resolve(__dirname, "index.html"),
                sass: resolve(__dirname, "sass.html"),
                animation: resolve(__dirname, "animation.html"),
                diagram: resolve(__dirname, "diagram.html"),
                karta: resolve(__dirname, "karta.html")
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

