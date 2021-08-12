export type ColorConfig = {
	colorMode: "light" | "dark";
	colorScheme: {
		light: string;
		dark: string;
	};
	color: {
		light: string;
		dark: string;
	};
	bgColor: {
		light: string;
		dark: string;
	};
	textColor?: {
		light: string;
		dark: string;
	};
	accentColor?: {
		light: string;
		dark: string;
	};
	errorColor?: {
		light: string;
		dark: string;
	};
};
