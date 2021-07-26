import { Box } from "@chakra-ui/layout";
import React from "react";

interface ResponsiveWrapperProps {}

export const ResponsiveWrapper: React.FC<ResponsiveWrapperProps> = ({
	children,
}) => {
	return (
		<Box
			mx="auto"
			maxW={{ base: "400px", sm: "400px", md: "500px", lg: "500px" }}
		>
			{children}
		</Box>
	);
};
