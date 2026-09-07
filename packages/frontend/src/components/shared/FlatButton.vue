<script setup lang="ts">
import Button from "./Button.vue";
import type { MessageSchema } from "@/i18n";
import { useI18n } from "vue-i18n";

defineProps<{
    /** 表示するテキスト */
    text: keyof MessageSchema;
}>();

const { t } = useI18n();
</script>

<template>
    <Button :class="$style.button">
        <span :class="$style.text">{{ t(text) }}</span>
    </Button>
</template>

<style lang="scss" module>
.button {
    position: relative;

    align-items: center;
    justify-content: center;
    gap: 0.25em;
    padding: 0.75em 1em;
    font-size: 1.1em;
    text-align: center;

    background-image: linear-gradient(130deg, #ffffff, #f0f0f0);
    color: #000000;

    border-radius: 1em;
    border: 1px solid var(--color-shadow);
    box-shadow: 2px 2px 4px -2px var(--color-shadow);

    &:not(:disabled):active {
        box-shadow:
            1px 1px 1px -1px var(--color-shadow),
            inset 1px 1px 3px -2px var(--color-shadow);
    }
    &:disabled {
        border: 1px solid transparent;
        box-shadow: none;
        filter: grayscale(100%) brightness(90%);
        opacity: 0.8;
        cursor: not-allowed;
    }
}
</style>
