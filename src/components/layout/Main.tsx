import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import React from "react";
import { Footer } from "./Footer";

interface MainProps {
	footer?: ReactJSXElement;
}

export const Main: React.FC<MainProps> = (props: any) => {
	const { children, footer, ...remainingProps } = props;
	return (
		<Flex
			width="100%"
			direction="column"
			height="100vh"
			justifyContent="space-between"
			{...remainingProps}
		>
			<Box px="6">{children}</Box>
			<Footer>{footer}</Footer>
		</Flex>
	);
};
