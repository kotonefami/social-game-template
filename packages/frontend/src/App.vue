<template>
    <div class="safe-area-wrapper">
        <div class="app-container">
            <h1>{{ t("tokens.screens.home") }}</h1>
            <ActionButton :icon="HomeIcon" text="dialog.hello.title" primary @click="openHello" />
        </div>
    </div>
    <DialogScreen />
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { Home as HomeIcon } from "@lucide/vue";
import ActionButton from "./components/shared/ActionButton.vue";
import DialogScreen from "./components/dialogs/DialogScreen.vue";
import HelloDialog from "./components/dialogs/HelloDialog.vue";
import { openDialog } from "./composables/useDialog";

const { t } = useI18n();

async function openHello() {
    const result = await openDialog(HelloDialog);
    console.log("HelloDialog closed with", result);
}
</script>

<style lang="scss">
:root {
    --color-background: #fffae5;
    --color-background-darken: #dad0ac;
    --color-accent: #ffcc00;
    --color-accent-hover: #ff9900;
    --color-shadow: #80808080;
    --color-panel-background: #ffffffa0;
    --color-panel-background-hover: #ffffff;
    --color-button-background: #b0b0b0;
    --color-button-background-hover: #909090;
}

[data-v-app] {
    position: absolute;
    inset: 0;
    background-color: var(--color-background);
}

:where(*, *::before, *::after) {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

:where(ul, ol) {
    list-style: none;
}

:where(img, svg, video) {
    display: block;
    max-width: 100%;
    pointer-events: none;
}

button,
a,
input {
    -webkit-tap-highlight-color: transparent;
}
</style>

<style>
#app {
    position: absolute;
    inset: 0;

    display: flex;
    align-items: center;
    justify-content: center;
}

/* 1. 画面全体を覆い、セーフエリアのパディングを設ける外枠 */
.safe-area-wrapper {
    position: fixed;
    inset: 0;
    padding-top: env(safe-area-inset-top, 0px);
    padding-right: env(safe-area-inset-right, 0px);
    padding-bottom: env(safe-area-inset-bottom, 0px);
    padding-left: env(safe-area-inset-left, 0px);
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

/* 2. セーフエリアの内側で、アスペクト比を維持しつつ最大化するコンテナ */
.app-container {
    width: 100%;
    height: 100%;
    /* dvh/dvw を使うことでモバイルブラウザのアドレスバー等も考慮したビューポート計算にするのがおすすめです */
    max-width: calc(100dvh / 1.77);
    max-height: calc(100dvw * 2.33);
    position: relative;
    overflow: hidden;
}
</style>
