/// <reference lib="webworker" />
declare let self: ServiceWorkerGlobalScope;

import { ExpirationPlugin } from "workbox-expiration";
import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { CacheFirst, NetworkFirst } from "workbox-strategies";

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
    ({ url }) => url.pathname.startsWith("/assets/icons/"),
    new CacheFirst({
        cacheName: "icon-cache",
        plugins: [
            new ExpirationPlugin({
                maxEntries: 50, // 最大50件
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30日間キャッシュ
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
