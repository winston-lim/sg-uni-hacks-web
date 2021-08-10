import { CloseIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	Heading,
	IconButton,
	Text,
	useColorMode,
	VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { OperationResult } from "urql";
import { CurrentUserQuery } from "../../generated/graphql";
import { DrawerItem } from "../data-display/DrawerItem";
import { DarkModeSwitch } from "../icons/DarkModeSwitch";
import { SizedBox } from "../layout/SizedBox";

interface MobileNavContentProps {
	isOpen: boolean;
	onClose(): void;
	userData: CurrentUserQuery | undefined;
	fetchingUserData: boolean;
	fetchingLogout: boolean;
	logout(): Promise<OperationResult>;
}

export const MobileNavContent: React.FC<MobileNavContentProps> = ({
	isOpen,
	onClose,
	userData,
	fetchingUserData,
	logout,
	fetchingLogout,
}) => {
	const router = useRouter();
	const { colorMode } = useColorMode();
	const bgColor = { dark: "black", light: "gray.50" };
	const color = { dark: "white", light: "black" };
	let drawerContent = null;
	let footerContent = null;
	if (fetchingUserData) {
		drawerContent = null;
		footerContent = null;
	} else if (
		userData === undefined ||
		userData === null ||
		!userData.currentUser
	) {
		//user is not logged in
		drawerContent = (
			<VStack alignItems="flex-start">
				<DrawerItem title="login" href="/login" />
				<DrawerItem title="about" href="/about" />
			</VStack>
		);
		footerContent = (
			<Button
				size="lg"
				onClick={async () => {
					router.push("/login");
					onClose();
				}}
			>
				Login
			</Button>
		);
	} else {
		drawerContent = (
			<VStack alignItems="flex-start">
				<DrawerItem title="contribute" href="/quick-submission" />
				<DrawerItem title="about" href="/about" />
				<DrawerItem title="my submissions" href="/my-submissions" />
			</VStack>
		);
		footerContent = (
			<Flex align="center">
				<Heading size="lg">{userData.currentUser.username}</Heading>
				<Box width="20" />
				<Button
					size="lg"
					onClick={async () => {
						await logout();
						router.push("/");
						onClose();
					}}
					isLoading={fetchingLogout}
				>
					Logout
				</Button>
			</Flex>
		);
	}
	return (
		<>
			<Drawer size="lg" placement="left" onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent
					maxBlockSiz="70%"
					background={bgColor[colorMode]}
					color={color[colorMode]}
				>
					<DrawerHeader borderBottomWidth="1px">
						<Flex alignItems="center" justifyContent="space-between">
							<Text fontWeight={600} fontSize="3xl">
								Navigation
							</Text>
							<DarkModeSwitch isFixed={false} />
							<IconButton
								aria-label="close menu"
								onClick={onClose}
								as={CloseIcon}
								bg={bgColor[colorMode]}
								color={color[colorMode]}
								size="20"
								justifySelf="flex-end"
							/>
						</Flex>
					</DrawerHeader>
					<DrawerBody>
						<Flex pt={5} justify="flex-start">
							{drawerContent}
						</Flex>
					</DrawerBody>
					<DrawerFooter>{footerContent}</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};
