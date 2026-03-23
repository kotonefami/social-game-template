<template>
    <div class="safe-area-wrapper">
        <div class="app-container">
            <h1>{{ t("hello") }} Frontend</h1>
        </div>
    </div>
    <div class="app-container">
        <h1>{{ t("hello") }} Frontend</h1>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

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
