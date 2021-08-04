import { Input, useColorMode } from "@chakra-ui/react";
import React, { useState } from "react";
import { useEffect } from "react";
import useDebounce from "../../utils/useDebounce";

interface SearchBarProps {
	display?: any;
	setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchBar: React.FC<SearchBarProps> = ({
	display,
	setSearchTerm,
}) => {
	const { colorMode } = useColorMode();
	const [value, setValue] = useState<string>("");
	const debouncedValue = useDebounce<string>(value, 2000);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.value);
	};
	useEffect(() => {
		setSearchTerm(debouncedValue);
	}, [debouncedValue]);
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
			value={value}
			onChange={handleChange}
		/>
	);
};
