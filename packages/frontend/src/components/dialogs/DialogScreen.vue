<script setup lang="ts">
import { dialogs } from "@/composables/useDialog";
import Screen from "../screens/Screen.vue";

function onClose(evt: MouseEvent) {
    if (evt.composedPath().some((el) => (el as HTMLElement).tagName === "DIALOG")) {
        return;
    }

    dialogs.value.at(-1)?.props.onClose?.(null);
}
</script>

<template>
    <Transition name="dialog-fade">
        <Screen v-if="dialogs.length > 0" @click="onClose" :class="$style.screen">
            <template #content>
                <TransitionGroup name="dialog-fade">
                    <component v-for="d in dialogs" :key="d.id" :is="d.component" v-bind="d.props" />
                </TransitionGroup>
            </template>
        </Screen>
    </Transition>
</template>

<style lang="scss" module>
.screen {
    --screen-background-edge: transparent;
    background-color: #00000030;
    backdrop-filter: blur(4px);
}
</style>

<style lang="scss">
.dialog-fade-enter-active,
.dialog-fade-leave-active {
    transition: opacity 0.2s ease;
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
    opacity: 0;
}
</style>
