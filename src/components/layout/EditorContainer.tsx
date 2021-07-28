import {
	BackgroundProps,
	Box,
	Button,
	ColorProps,
	HStack,
	useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";

interface EditorContainerProps {
	bgColor: BackgroundProps["bgColor"];
	borderColor: BackgroundProps["bgColor"];
	textColor: ColorProps["color"];
	isReady: boolean;
	handleSave(): void;
	handleClear(): void;
}

export const EditorContainer: React.FC<EditorContainerProps> = ({
	bgColor,
	borderColor,
	textColor,
	isReady,
	handleSave,
	handleClear,
}) => {
	const buttonSize = useBreakpointValue({ base: "xs", sm: "md", md: "lg" });
	return (
		<Box>
			<Box
				bg={borderColor}
				mx="auto"
				borderRadius="xl"
				h={{ base: "700px", md: "1000px", lg: "1400px" }}
				maxW={{ base: "450px", md: "800px", lg: "1000px" }}
				position="relative"
			>
				{/* <Heading position="absolute" left="4%" top="1.5%">
					Editor.Js
				</Heading> */}
				<HStack
					position="absolute"
					left={{ base: "15%", sm: "30%", md: "55%", lg: "60%" }}
					top={{ base: "1%", sm: "2%", md: "1.5%" }}
					spacing={5}
				>
					<Button
						colorScheme="yellow"
						color="white"
						bgColor="yellow.400"
						size={buttonSize}
						disabled={!isReady}
						onClick={handleClear}
					>
						Clear
					</Button>
					<Button
						colorScheme="green"
						color="white"
						bgColor="green.400"
						size={buttonSize}
						disabled={!isReady}
						onClick={handleSave}
					>
						Submit for review
					</Button>
				</HStack>
				<Box
					boxShadow={borderColor === "teal.400" ? "2xl" : "inner"}
					id="editorContainer"
					borderRadius="xl"
					position="absolute"
					left="4%"
					top={{ base: "5%", sm: "10%", md: "8%", lg: "6%" }}
					zIndex={1}
					bgColor={bgColor}
					maxW="92%"
					w="92%"
					h={{ base: "91%", sm: "88%", md: "90%", lg: "92%" }}
					py={50}
					textColor={textColor}
					overflow="auto"
				></Box>
			</Box>
		</Box>
	);
};
