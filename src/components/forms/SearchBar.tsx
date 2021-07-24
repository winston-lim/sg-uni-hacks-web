import { Input, useColorMode } from "@chakra-ui/react";
import React from "react";

interface SearchBarProps {
	display?: any;
}

export const SearchBar: React.FC<SearchBarProps> = ({ display }) => {
	const { colorMode } = useColorMode();
	console.log(colorMode);

	const bgColor = { dark: "gray.700", light: "gray.50" };

	const color = { dark: "white", light: "black" };
	return (
		<Input
			variant="filled"
			color={color[colorMode]}
			bgColor={bgColor[colorMode]}
			placeholder="Find a hack"
			w={{ md: "500px", lg: "800px" }}
			mr="5"
			display={display}
		/>
	);
};
