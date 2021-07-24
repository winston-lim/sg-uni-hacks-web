import { Box } from "@chakra-ui/react";
import React from "react";

interface SizedWrapperProps {
	width: number;
}

export const SizedWrapper: React.FC<SizedWrapperProps> = ({
	width,
	children,
}) => {
	return (
		<Box maxW={width} alignItems="center">
			{children}
		</Box>
	);
};
