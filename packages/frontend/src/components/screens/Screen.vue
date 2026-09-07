<template>
    <section :class="$style.screen">
        <div :class="$style.background">
            <slot name="background" />
        </div>
        <div :class="$style.foreground">
            <slot name="content" />
        </div>
    </section>
</template>

<style lang="scss" module>
.screen {
    position: absolute;
    inset: 0;

    display: flex;
    align-items: center;
    justify-content: center;
}
.background {
    width: 100%;
    height: 100%;
    max-width: calc(100dvh / 1);
    max-height: calc(100dvw * 2.33);
    position: relative;
    overflow: hidden;

    // NOTE: mask-image の透明部分を埋める背景色。
    // TransitionMask 等で --screen-background-bg を設定することで、
    // 画面切り替え時に背後の Screen#background が透けるのを防止する。
    background-color: var(--screen-background-bg, transparent);

    // NOTE: TransitionMask から階段アニメーションの clip-path を受け取る
    clip-path: var(--screen-clip-path, none);
    transition: var(--screen-clip-transition, none);
    -webkit-clip-path: var(--screen-clip-path, none);

    @media (min-width: calc(100dvh / 1)) {
        $fade-width: 10dvw;

        // NOTE: 画面の両端をフェードアウトさせる。
        // mask-image の代わりに疑似要素のグラデーションオーバーレイを使用し、
        // 透明化ではなく背景色で上塗りすることで背後の要素の透けを防止する。
        &::after {
            content: "";
            position: absolute;
            inset: 0;
            pointer-events: none;
            background: linear-gradient(
                to right,
                var(--screen-background-edge, var(--color-background)) 0%,
                color-mix(in srgb, var(--screen-background-edge, var(--color-background)) 96%, transparent) calc($fade-width / 10),
                color-mix(in srgb, var(--screen-background-edge, var(--color-background)) 81%, transparent) calc($fade-width / 4),
                transparent $fade-width,
                transparent calc(100% - $fade-width),
                color-mix(in srgb, var(--screen-background-edge, var(--color-background)) 81%, transparent) calc(100% - $fade-width / 4),
                color-mix(in srgb, var(--screen-background-edge, var(--color-background)) 96%, transparent) calc(100% - $fade-width / 10),
                var(--screen-background-edge, var(--color-background)) 100%
            );
        }
    }
}
.foreground {
    position: fixed;
    max-width: calc(100dvh / 1.77);
    max-height: calc(100dvw * 2.33);
    inset: env(safe-area-inset-top, 0px) env(safe-area-inset-right, 0px) env(safe-area-inset-bottom, 0px)
        env(safe-area-inset-left, 0px);
    margin: auto;
    overflow: hidden;
}
</style>
