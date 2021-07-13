import { Box, useColorMode } from "@chakra-ui/react";

export const Container = (props: any) => {
	const { colorMode } = useColorMode();
	console.log(colorMode);

	const bgColor = { light: "gray.50", dark: "gray.900" };

	const color = { light: "black", dark: "white" };
	return (
		<Box
			alignItems="center"
			bg={bgColor[colorMode]}
			color={color[colorMode]}
			{...props}
		/>
	);
};
