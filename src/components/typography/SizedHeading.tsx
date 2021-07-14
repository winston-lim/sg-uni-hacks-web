import { Heading } from "@chakra-ui/react";

import React from "react";
import { DefaultSizeVariants } from "../../types/default";

interface HeadingProps {
	title: string;
	variant: DefaultSizeVariants;
}

export const SizedHeading: React.FC<HeadingProps> = ({ title, variant }) => {
	const headingSizes = {
		sm: "xl",
		md: "2xl",
		lg: "4xl",
		xl: "6xl",
	};
	return (
		<Heading fontSize={headingSizes[variant]} bgClip="border-box">
			{title}
		</Heading>
	);
};
