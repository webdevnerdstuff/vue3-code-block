import { Props } from '../types';
declare const _default: __VLS_WithTemplateSlots<import("vue").DefineComponent<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    browserWindow: boolean;
    cssPath: undefined;
    code: string;
    codeBlockRadius: string;
    copyButton: boolean;
    copyIcons: boolean;
    copyTab: boolean;
    copyFailedText: string;
    copyText: string;
    copySuccessText: string;
    floatingTabs: boolean;
    height: string;
    highlightjs: boolean;
    indent: number;
    label: string;
    lang: string;
    maxHeight: string;
    persistentCopyButton: boolean;
    prismjs: boolean;
    prismPlugin: boolean;
    runTab: boolean;
    runText: string;
    tabGap: string;
    tabs: boolean;
    theme: string;
}>, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {
    run: (...args: any[]) => void;
    "update:copy-status": (...args: any[]) => void;
}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<__VLS_WithDefaults<__VLS_TypePropsToRuntimeProps<Props>, {
    browserWindow: boolean;
    cssPath: undefined;
    code: string;
    codeBlockRadius: string;
    copyButton: boolean;
    copyIcons: boolean;
    copyTab: boolean;
    copyFailedText: string;
    copyText: string;
    copySuccessText: string;
    floatingTabs: boolean;
    height: string;
    highlightjs: boolean;
    indent: number;
    label: string;
    lang: string;
    maxHeight: string;
    persistentCopyButton: boolean;
    prismjs: boolean;
    prismPlugin: boolean;
    runTab: boolean;
    runText: string;
    tabGap: string;
    tabs: boolean;
    theme: string;
}>>> & {
    onRun?: ((...args: any[]) => any) | undefined;
    "onUpdate:copy-status"?: ((...args: any[]) => any) | undefined;
}, {
    persistentCopyButton: boolean;
    highlightjs: boolean;
    floatingTabs: boolean;
    tabGap: string | number;
    copyTab: boolean;
    height: string | number;
    maxHeight: string | number;
    codeBlockRadius: string;
    runTab: boolean;
    tabs: boolean;
    code: string | number | object | [];
    label: string;
    browserWindow: boolean;
    cssPath: string;
    copyButton: boolean;
    copyIcons: boolean;
    copyFailedText: string;
    copyText: string;
    copySuccessText: string;
    indent: number;
    lang: string;
    prismjs: boolean;
    prismPlugin: boolean;
    runText: string;
    theme: string | boolean;
}, {}>, {
    label?(_: {}): any;
    tabs?(_: {}): any;
    copyButton?(_: {}): any;
}>;
export default _default;
type __VLS_NonUndefinedable<T> = T extends undefined ? never : T;
type __VLS_TypePropsToRuntimeProps<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? {
        type: import('vue').PropType<__VLS_NonUndefinedable<T[K]>>;
    } : {
        type: import('vue').PropType<T[K]>;
        required: true;
    };
};
type __VLS_WithDefaults<P, D> = {
    [K in keyof Pick<P, keyof P>]: K extends keyof D ? __VLS_Prettify<P[K] & {
        default: D[K];
    }> : P[K];
};
type __VLS_Prettify<T> = {
    [K in keyof T]: T[K];
} & {};
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
