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
			<Flex
				minW={{ base: 360, sm: 400, md: 600, lg: 800 }}
				flex={col1}
				align="center"
				direction="column"
			>
				{child1}
			</Flex>
			<Flex ml={10} flex={col2} align="center" direction="column">
				{child2}
			</Flex>
		</Flex>
	);
};
