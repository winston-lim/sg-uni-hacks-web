import { Box, Flex } from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import React from "react";

interface FractionContainerProps {
	col1: number;
	col2: number;
	child1: ReactJSXElement;
	child2: ReactJSXElement;
}

export const FractionContainer: React.FC<FractionContainerProps> = ({
	col1,
	col2,
	child1,
	child2,
}) => {
	return (
		<Flex
			direction={{ base: "column", sm: "column", md: "row", lg: "row" }}
			justifyContent="space-around"
		>
			<Flex flex={col1} align="center" direction="column">
				<Box>{child1}</Box>
			</Flex>
			<Flex
				ml={10}
				flex={col2}
				align="center"
				justifyContent="center"
				direction="column"
			>
				<Box>{child2}</Box>
			</Flex>
		</Flex>
	);
};
