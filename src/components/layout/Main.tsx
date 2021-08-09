import {
	BackgroundProps,
	Box,
	ColorProps,
	Flex,
	Spacer,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import React, { useEffect, useState } from "react";
import { Filler } from "./Filler";
import { Footer } from "./Footer";

interface MainProps {
	footer?: ReactJSXElement;
}

export const Main: React.FC<MainProps> = (props: any) => {
	const { children, footer, ...remainingProps } = props;
	const [mainContentId, setMainContentId] = useState<string | null>(null);
	const { colorMode } = useColorMode();
	const bgColor = { dark: "gray.900", light: "gray.50" };
	const color = { dark: "white", light: "black" };
	useEffect(() => {
		setMainContentId("mainContentContainer");
	}, []);
	return (
		<Flex
			direction="column"
			justify="space-between"
			bg={bgColor[colorMode]}
			height="100%"
			color={color[colorMode]}
			maxW="100vw"
			{...remainingProps}
		>
			<Box id="mainContentContainer" px="auto" mb={10}>
				{children}
			</Box>
			{mainContentId ? <Filler relativeContainerId={mainContentId} /> : null}
			<Footer>{footer}</Footer>
		</Flex>
	);
};
