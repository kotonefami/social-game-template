<template>
    <button type="button" :class="$style.button">
        <slot />
    </button>
</template>

<style lang="scss" module>
.button {
    display: flex;

    background: none;
    border: none;
    outline: none;
    color: inherit;
    font: inherit;

    cursor: pointer;

    transition: 150ms transform cubic-bezier(0, 1, 0.7, 1);

    &:not(:disabled):active {
        transform: scale(95%);
    }
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
}
</style>
