import { useColorMode, Switch, Icon, HStack } from "@chakra-ui/react";
import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

interface DarkModeSwitchProps {
	isFixed?: boolean;
	display?: any;
}

export const DarkModeSwitch: React.FC<DarkModeSwitchProps> = ({
	isFixed,
	display,
}) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const isDark = colorMode === "dark";
	return (
		<HStack
			position={isFixed ? "fixed" : undefined}
			display={display ? display : "flex"}
			top="1rem"
			right="1rem"
			zIndex="3"
			align="center"
			spacing={2}
		>
			<Switch isChecked={isDark} onChange={toggleColorMode} />
			<Icon
				as={FaMoon}
				color="white"
				display={isDark ? "block" : "none"}
				transition="color 0.2s"
				w="5"
				h="5"
			/>
			<Icon
				as={FaSun}
				display={isDark ? "none" : "block"}
				transition="color 0.2s"
				w="5"
				h="5"
				color="yellow.500"
			/>
		</HStack>
	);
};
