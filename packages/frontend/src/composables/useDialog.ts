import { ref, markRaw } from "vue";
import type Dialog from "@/components/dialogs/Dialog.vue";

/** イベント名（例: "close"）からプロパティ名（例: "onClose"）を生成する型 */
type EventPropName<E extends string> = `on${Capitalize<E>}`;

/** コンポーネントの型とイベント名から、emitの「すべての引数の型（タプル）」を取得する型 */
type ExtractEmitArgs<T extends abstract new (...args: any) => any, E extends string> =
    EventPropName<E> extends keyof InstanceType<T>["$props"]
        ? NonNullable<InstanceType<T>["$props"][EventPropName<E>]> extends (...args: infer Args) => any
            ? Args
            : never
        : never;

/** emit の引数のうち、「1つ目の引数（value）」の型だけを取得する型 */
type ExtractEmitValue<T extends abstract new (...args: any) => any, E extends string> =
    ExtractEmitArgs<T, E> extends []
        ? void
        : ExtractEmitArgs<T, E> extends infer ArgsArray extends any[]
          ? ArgsArray[0]
          : never;

/** ダイアログ管理用のデータ */
interface DialogInstance<C extends typeof Dialog = typeof Dialog> {
    /** ダイアログのユニークID */
    id: number;
    /** レンダリングするコンポーネント */
    component: C;
    /** コンポーネントに渡すプロパティ */
    props: InstanceType<C>["$props"];
    /** 解決用の Promise の resolve 関数 */
    resolve: (value: ExtractEmitValue<C, "close">) => void;
}

/** 現在開いているダイアログの配列 */
export const dialogs = ref<DialogInstance[]>([]);
let nextId = 0;

/**
 * ダイアログを開き、戻り値を待機します。
 * @param component 開くコンポーネント（Dialog.vue をラップしたり内部で使用するもの）
 * @param props コンポーネントに渡すプロパティ (任意)
 * @returns ユーザーが閉じた時に解決される Promise
 */
export function openDialog<C extends new (...args: any) => any>(
    component: C,
    props: InstanceType<C>["$props"] = {},
): Promise<ExtractEmitValue<C, "close">> {
    return new Promise((resolve) => {
        const id = nextId++;

        // onCloseイベントで結果を受け取る想定
        const closeHandler = (result: ExtractEmitValue<C, "close">) => {
            const index = dialogs.value.findIndex((d) => d.id === id);
            if (index !== -1) {
                dialogs.value.splice(index, 1);
            }
            resolve(result);
        };

        dialogs.value.push({
            id,
            component: markRaw(component as any),
            props: {
                ...props,
                onClose: closeHandler,
            },
            resolve,
        });
    });
}
