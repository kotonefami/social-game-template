import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            // NOTE: Service Worker の出力先。src/worker/worker.ts を /worker.js にビルドする
            srcDir: "src/worker",
            filename: "worker.ts",

            // NOTE: PWA のマニフェストファイルの出力先
            manifestFilename: "manifest.json",

            registerType: "autoUpdate",
            strategies: "injectManifest",
            includeAssets: ["apple-touch-icon.webp"],

            // NOTE: PWA のマニフェストファイルの内容
            manifest: {
                name: "Social Game Template",
                short_name: "Social",
                description: "A template for social game PWA",
                background_color: "#ffffff",
                theme_color: "#ffffff",
                orientation: "portrait",
                lang: "ja",
                icons: [
                    {
                        src: "/assets/icons/icon-128x128.webp",
                        sizes: "128x128",
                        type: "image/webp",
                        purpose: "any",
                    },
                    {
                        src: "/assets/icons/icon-192x192.webp",
                        sizes: "192x192",
                        type: "image/webp",
                        purpose: "any",
                    },
                    {
                        src: "/assets/icons/icon-512x512.webp",
                        sizes: "512x512",
                        type: "image/webp",
                        purpose: "any",
                    },
                    {
                        src: "/assets/icons/icon-512x512-maskable.webp",
                        sizes: "512x512",
                        type: "image/webp",
                        purpose: "maskable",
                    },
                ],
            },

            // NOTE: 開発環境で Service Worker を有効にする（通常は本番環境のみで有効にする）
            devOptions: { enabled: true, type: "module" },
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
