import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
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
            includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],

            // NOTE: PWA のマニフェストファイルの内容
            manifest: {
                name: "Social Game",
                short_name: "Social",
                description: "The description of your PWA",
                background_color: "#ffffff",
                theme_color: "#ffffff",
                orientation: "portrait",
                lang: "ja",
                icons: [
                    {
                        src: "pwa-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                    },
                    {
                        src: "pwa-512x512.png",
                        sizes: "512x512",
                        type: "image/png",
                    },
                ],
            },

            // NOTE: 開発環境で Service Worker を有効にする（通常は本番環境のみで有効にする）
            devOptions: { enabled: true, type: "module" },
        }),
    ],
});
