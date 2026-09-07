<script setup lang="ts">
import Dialog from "./Dialog.vue";
import Paragraphs from "../shared/Paragraphs.vue";

const emit = defineEmits<{
    (e: "close", value: boolean): void;
}>();

const close = (value: unknown = false) => emit("close", Boolean(value));
</script>

<template>
    <Dialog title="dialog.hello.title" @close="close">
        <Paragraphs text="dialog.hello.content" />
    </Dialog>
</template>