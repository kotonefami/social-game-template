import { createI18n } from "vue-i18n";
import { en } from "./locales/en.ts";
import { ja } from "./locales/ja.ts";

const messages = {
    en,
    ja,
};

const i18n = createI18n({
    locale: navigator.language.split("-")[0] || "ja",
    fallbackLocale: "ja",
    messages,
    legacy: false,
});

export default i18n;
