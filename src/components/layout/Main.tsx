import {
	BackgroundProps,
	Box,
	ColorProps,
	Flex,
	Spacer,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import React from "react";
import { Footer } from "./Footer";

interface MainProps {
	footer?: ReactJSXElement;
}

export const Main: React.FC<MainProps> = (props: any) => {
	const { children, footer, ...remainingProps } = props;
	const { colorMode } = useColorMode();
	const bgColor = { dark: "gray.900", light: "gray.50" };
	const color = { dark: "white", light: "black" };
	return (
		<Flex
			margin={0}
			direction="column"
			justify="space-between"
			bg={bgColor[colorMode]}
			height="100%"
			color={color[colorMode]}
			{...remainingProps}
		>
			<Box px={5} mx="auto">
				{children}
			</Box>
			<Footer>{footer}</Footer>
		</Flex>
	);
};
