<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import type { MessageSchema } from "../../i18n";

const props = defineProps<{
    /**
     * 表示するテキストの翻訳キー。
     *
     * 現在は `\n\n` での段落区切り、`**` での太字装飾、`---` での区切り線をサポートしています。
     */
    text?: keyof MessageSchema;
    /**
     * 表示するコンテンツ。
     *
     * 現在は `\n\n` での段落区切り、`**` での太字装飾、`---` での区切り線をサポートしています。
     */
    content?: string;
}>();

const { t } = useI18n();

function getContent() {
    if (props.text) return t(props.text);
    return props.content ?? "?";
}
function getCompiledLine(line: string) {
    let rawHtml = line.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    rawHtml = rawHtml.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    rawHtml = rawHtml.replace(/^---$/gm, "<hr />");
    rawHtml = rawHtml.replace(/^\\-\\-\\-$/gm, "---");
    return rawHtml;
}
</script>

<template>
    <div :class="$style.paragraphs">
        <p
            v-html="getCompiledLine(line)"
            v-for="line in getContent().split('\n\n')"
            :key="line"
            :class="$style.paragraph"
        />
    </div>
</template>

<style lang="scss" module>
.paragraphs {
    display: flex;
    flex-direction: column;
    gap: 1em;

    line-height: 1.3;

    white-space: pre-wrap;
    line-break: strict;

    hr {
        border: 1px solid var(--color-shadow);
        margin: 1em 0;
    }
}
</style>
