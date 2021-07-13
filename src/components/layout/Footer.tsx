import { Box, Flex, useColorMode } from "@chakra-ui/react";
import React from "react";

export const Footer = (props: any) => {
	const { colorMode } = useColorMode();

	const bgColor = { dark: "teal.300", light: "gray.700" };

	const color = { dark: "black", light: "white" };
	return (
		<Box width="auto">
			<Flex
				bg={bgColor[colorMode]}
				color={color[colorMode]}
				py={{ base: "20px", sm: "20px", md: "30", lg: "30" }}
				direction="row"
				justifyContent="center"
				{...props}
			/>
		</Box>
	);
};
