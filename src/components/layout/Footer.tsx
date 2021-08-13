import { Box, useColorMode } from "@chakra-ui/react";
import React from "react";

export const Footer = (props: any) => {
	const { colorMode } = useColorMode();

	const bgColor = { light: "teal.200", dark: "blue.200" };

	const color = { light: "black", dark: "white" };
	return (
		<Box
			bg={bgColor[colorMode]}
			color={color[colorMode]}
			py={{ base: "20px", sm: "20px", md: "30", lg: "30" }}
			width="auto"
			as="footer"
			zIndex={1}
		>
			{props.children}
		</Box>
	);
};
