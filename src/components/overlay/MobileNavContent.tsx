import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	useColorMode,
	VStack,
} from "@chakra-ui/react";
import React from "react";
import { DrawerItem } from "../data-display/DrawerItem";
import { DarkModeSwitch } from "../icons/DarkModeSwitch";

interface MobileNavContentProps {
	isOpen: boolean;
	onClose(): void;
}

export const MobileNavContent: React.FC<MobileNavContentProps> = ({
	isOpen,
	onClose,
}) => {
	const { colorMode } = useColorMode();
	const bgColor = { light: "black", dark: "gray.50" };
	const color = { light: "white", dark: "black" };

	return (
		<>
			<Drawer size="xs" placement="left" onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent background={bgColor[colorMode]} color={color[colorMode]}>
					<DrawerCloseButton />
					<DrawerHeader borderBottomWidth="1px">
						<Flex align="center" justifyContent="space-between">
							Navigation
							<DarkModeSwitch isFixed={false} />
							<Flex />
						</Flex>
					</DrawerHeader>
					<DrawerBody>
						<Flex pt={5} justify="flex-start">
							<VStack alignItems="flex-start">
								<DrawerItem title="My profile" href="" />
								<DrawerItem title="My Submissions" href="" />
							</VStack>
						</Flex>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
};
