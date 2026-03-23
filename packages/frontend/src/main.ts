import { createApp } from "vue";
import App from "./App.vue";
import { registerSW } from "virtual:pwa-register";
import i18n from "./i18n";

registerSW({
    immediate: true,
    onRegistered() {
        console.log("Service Worker registered");
    },
    onRegisterError(error) {
        console.error("Service Worker registration failed", error);
    },
});

const app = createApp(App);
app.use(i18n);
app.mount("#app");
