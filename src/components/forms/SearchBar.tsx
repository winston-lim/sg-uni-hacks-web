import { Input, useColorMode } from "@chakra-ui/react";
import React from "react";

interface SearchBarProps {
	display?: any;
}

export const SearchBar: React.FC<SearchBarProps> = ({ display }) => {
	const { colorMode } = useColorMode();
	console.log(colorMode);

	const bgColor = { light: "gray.700", dark: "gray.50" };

	const color = { light: "white", dark: "black" };
	return (
		<Input
			variant="filled"
			color={color[colorMode]}
			bgColor={bgColor[colorMode]}
			placeholder="Find a hack"
			size="lg"
			mr="5"
			display={display}
		/>
	);
};
