import React from "react";
import { Container } from "./Container";
import { DarkModeSwitch } from "../icons/DarkModeSwitch";
import { Box, Flex } from "@chakra-ui/react";
import { Footer } from "./Footer";

export const ColorModeWrapper: React.FC<{}> = ({ children }) => {
	return (
		<Flex margin={0} direction="column" justify="space-between">
			<Box px={5} mx="auto">
				{children}
			</Box>
			<DarkModeSwitch isFixed={true} />
		</Flex>
	);
};
