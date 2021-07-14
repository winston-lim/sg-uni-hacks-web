import { Box } from "@chakra-ui/react";
import React from "react";

interface SizedBoxProps {
	height?: number;
	width?: number;
}

export const SizedBox: React.FC<SizedBoxProps> = ({ width, height }) => {
	return (
		<Box
			height={
				height !== undefined
					? {
							base: height,
							sm: height * 1.25,
							md: height * 1.5,
							lg: height * 1.6,
							xl: height * 1.8,
					  }
					: undefined
			}
			width={
				width !== undefined
					? { sm: width, md: width * 1.5, lg: width * 1.75, xl: width * 2 }
					: undefined
			}
		/>
	);
};
