import { Box } from "@chakra-ui/layout";
import React from "react";
import { DefaultSizeVariants } from "../../types/default";

interface wrapperProps {
	variant?: DefaultSizeVariants;
}

export const SizedWrapper: React.FC<wrapperProps> = ({ children }) => {
	return (
		<Box
			mx="auto"
			maxW={{ base: "400px", sm: "400px", md: "500px", lg: "500px" }}
			w="100%"
		>
			{children}
		</Box>
	);
};
