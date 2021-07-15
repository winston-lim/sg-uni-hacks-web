import { Box, useColorMode } from "@chakra-ui/react";

export const Container = (props: any) => {
	const { colorMode } = useColorMode();

	const bgColor = { light: "gray.900", dark: "gray.50" };

	const color = { light: "white", dark: "black" };
	return (
		<Box
			alignItems="center"
			bg={bgColor[colorMode]}
			color={color[colorMode]}
			{...props}
		/>
	);
};
