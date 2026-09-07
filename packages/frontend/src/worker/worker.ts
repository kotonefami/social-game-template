/// <reference lib="webworker" />
declare let self: ServiceWorkerGlobalScope;

import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";

precacheAndRoute(self.__WB_MANIFEST);

/** 1日の秒数 */
const DAYS = 24 * 60 * 60;

registerRoute(
    ({ url }) => url.pathname.startsWith("/assets/"),
    new CacheFirst({
        cacheName: "asset-cache",
        plugins: [
            new ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 30 * DAYS,
            }),
        ],
    }),
);
registerRoute(
    ({ url }) => url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com",
    new CacheFirst({
        cacheName: "font-cache",
        plugins: [
            new ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 30 * DAYS,
            }),
        ],
    }),
);
// 例2: 外部の API リクエスト（例: https://api.example.com/data 配下）を NetworkFirst でキャッシュする
registerRoute(
    ({ url }) => url.origin === "https://api.example.com" && url.pathname.startsWith("/data"),
    new NetworkFirst({
        cacheName: "api-data-cache",
        plugins: [
            new ExpirationPlugin({
                maxEntries: 100,
                maxAgeSeconds: 24 * 60 * 60, // 1日間キャッシュ
            }),
        ],
    }),
);
