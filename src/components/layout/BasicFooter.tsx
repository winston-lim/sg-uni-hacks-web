import { Flex, Text } from "@chakra-ui/react";
import React from "react";

interface BasicFooterProps {}

export const BasicFooter: React.FC<BasicFooterProps> = ({}) => {
	return (
		<Flex direction="row" justifyContent="center">
			<Text>S.U.H 2021</Text>
		</Flex>
	);
};
