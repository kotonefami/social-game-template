<script setup lang="ts">
import type { Component } from "vue";
import Button from "./Button.vue";
import type { MessageSchema } from "@/i18n";
import { useI18n } from "vue-i18n";

withDefaults(
    defineProps<{
        /** 表示するアイコンコンポーネント。SVG であることを想定しています。 */
        icon: Component;
        /** 表示するテキスト */
        text?: keyof MessageSchema;
        /** バッジ内容 */
        badge?: string;
        /** プライマリボタンにするかどうか */
        primary?: boolean;
    }>(),
    {
        primary: false,
    },
);

const { t } = useI18n();
</script>

<template>
    <Button :class="[$style.button, primary ? $style.primary : null]">
        <component :is="icon" />
        <span v-if="text" :class="$style.text">{{ t(text) }}</span>
        <span v-if="badge" :class="$style.badge">{{ badge }}</span>
    </Button>
</template>

<style lang="scss" module>
.button {
    position: relative;

    align-items: center;
    gap: 0.25em;
    padding: 0.5em 1.3em;
    overflow: hidden;

    background-image: linear-gradient(to right, var(--color-background-1), var(--color-background-2));
    color: #ffffff;

    border-radius: 1e9em;
    box-shadow:
        0px 0px 0px 2px #ffffff,
        0px 0px 0px 3px var(--color-background-1),
        0px 0px 20px -4px var(--color-background-1);

    &:not(.primary) {
        --color-background-1: var(--color-button-background);
        --color-background-2: var(--color-button-background-hover);
    }
    &.primary {
        --color-background-1: var(--color-accent);
        --color-background-2: var(--color-accent-hover);
    }

    svg {
        font-size: 2.5rem;
    }
    span {
        font-size: 1.1rem;

        position: relative;
        top: 1px;
        line-height: 1;
    }

    // NOTE: ホバー時に明るくなる
    &::before {
        content: "";
        position: absolute;
        inset: 0;
        background-color: #ffffff40;
        opacity: 0;
        transition: 100ms;
    }
    // NOTE: ホバー時に光の線が流れるアニメーション
    &::after {
        content: "";
        position: absolute;
        left: -50%;
        top: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, #ffffff00, #ffffff80, #ffffff00);
        transform: translateX(-100%) skewX(-20deg);
    }
    &:hover {
        &:not(.primary)::before {
            opacity: 0.5;
        }
        &.primary::before {
            opacity: 1;
        }
        &.primary::after {
            transition: 500ms;
            transform: translateX(200%) skewX(-20deg);
        }
    }
    &:disabled {
        filter: grayscale(100%);
        opacity: 0.8;
        cursor: not-allowed;
    }
}
</style>
