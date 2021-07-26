import { Box, useColorMode } from "@chakra-ui/react";

export const Container = (props: any) => {
	const { colorMode } = useColorMode();

	const bgColor = { dark: "gray.900", light: "gray.50" };

	const color = { dark: "white", light: "black" };
	return (
		<Box
			minH="100vw"
			maxW="100vw"
			alignItems="center"
			bg={bgColor[colorMode]}
			color={color[colorMode]}
			{...props}
		/>
	);
};
