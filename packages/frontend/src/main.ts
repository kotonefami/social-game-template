import { createApp } from "vue";
import App from "./App.vue";
import { registerSW } from "virtual:pwa-register";

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
app.mount("#app");
