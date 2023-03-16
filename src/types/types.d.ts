export type Props = {
	browserWindow?: boolean;
	code?: object | [] | string | number;
	codeBlockRadius?: string;
	copyButton?: boolean;
	copyIcons?: boolean;
	copyTab?: boolean;
	copyFailedText?: string;
	copyText?: string;
	copySuccessText?: string;
	floatingTabs?: boolean;
	globalOptions?: boolean;
	height?: string | number;
	indent?: number;
	label?: string;
	lang?: string;
	maxHeight?: string | number;
	persistentCopyButton?: boolean;
	runTab?: boolean;
	runText?: string;
	tabGap?: string;
	tabs?: boolean;
	theme?: string | boolean;
};
