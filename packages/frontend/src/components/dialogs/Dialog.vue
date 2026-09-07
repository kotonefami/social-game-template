<template>
    <dialog :class="$style.dialog" open>
        <header v-if="title">
            <h2>{{ t(title) }}</h2>
        </header>

        <div :class="$style.container">
            <slot />
        </div>

        <footer>
            <slot name="footer">
                <ActionButton @click="close()" :icon="XIcon" text="common.button.close" />
            </slot>
        </footer>
    </dialog>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import type { MessageSchema } from "../../i18n";
import ActionButton from "../shared/ActionButton.vue";
import { X as XIcon } from "@lucide/vue";

/**
 * ダイアログのタイトルおよびプロパティ
 */
const props = defineProps<{
    title?: keyof MessageSchema;
}>();

/** ダイアログを閉じる際のイベント。任意の戻り値を渡すことができます。 */
const emit = defineEmits<{
    (e: "close", value: any): void;
}>();

const { t } = useI18n();

/**
 * ダイアログを閉じます。
 * @param value ダイアログの戻り値
 */
const close = (value: any = undefined) => {
    emit("close", value);
};
</script>

<style lang="scss" module>
.dialog {
    $border-radius: 1em;

    display: flex;
    flex-direction: column;

    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);

    width: 90%;
    max-height: 90vh;
    margin: auto;

    background-color: #fff;
    border: none;
    border-radius: $border-radius;
    box-shadow: 0px 0px 1em 0px var(--color-shadow);
    animation: dialog-open 0.2s cubic-bezier(0.25, 1, 0.5, 1);

    header {
        text-align: center;

        background-image: linear-gradient(to right, var(--color-accent), var(--color-accent-hover));
        border-top-left-radius: $border-radius;
        border-top-right-radius: $border-radius;
        border-bottom: 1px solid var(--color-shadow);
        padding: 0.5em 1em;

        color: #ffffff;

        h2 {
            font-size: 1.1em;
            font-weight: normal;
        }
    }
    .container {
        $padding: 1.5em;

        flex: 1;
        overflow-y: auto;
        padding: $padding;
        padding-bottom: $padding + 1.5em;
    }
    footer {
        display: flex;
        justify-content: center;
        gap: 2em;

        position: absolute;
        left: 0px;
        right: 0px;
        bottom: -1em;
    }
}

@keyframes dialog-open {
    from {
        opacity: 0;
        transform: translateY(-50%) translateX(-50%) scale(0.95) translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(-50%) translateX(-50%) scale(1) translateY(0);
    }
}
</style>
