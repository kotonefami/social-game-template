<script setup lang="ts">
import Dialog from "@/components/dialogs/Dialog.vue";
import Paragraphs from "../shared/Paragraphs.vue";
import type { MessageSchema } from "../../i18n";

defineProps<{
    text?: keyof MessageSchema;
}>();

const emit = defineEmits<{
    (e: "close"): void;
}>();
</script>

<template>
    <Dialog title="dialog.error.title" @close="$emit('close')">
        <Paragraphs :text="text" />
    </Dialog>
</template>

<style lang="scss" module>
.container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1em;
}
</style>
