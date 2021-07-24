import {
	Flex,
	Link,
	HStack,
	Icon,
	Box,
	useColorMode,
	Button,
} from "@chakra-ui/react";
import React from "react";
import { FaAddressCard, FaFile } from "react-icons/fa";
import { DarkModeSwitch } from "../icons/DarkModeSwitch";
import NextLink from "next/link";
import { CurrentUserQuery } from "../../generated/graphql";
import { SizedBox } from "../layout/SizedBox";
import { OperationResult } from "urql";
import { useRouter } from "next/router";

const GithubIcon = (props: React.ComponentProps<"svg">) => (
	<svg viewBox="0 0 20 20" {...props}>
		<path
			fill="currentColor"
			d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"
		/>
	</svg>
);

interface NavBarContentProps {
	userData: CurrentUserQuery | undefined;
	fetchingUserData: boolean;
	fetchingLogout: boolean;
	logout(): Promise<OperationResult>;
}

export const NavBarContent: React.FC<NavBarContentProps> = ({
	userData,
	fetchingUserData,
	fetchingLogout,
	logout,
}) => {
	const router = useRouter();
	const { colorMode } = useColorMode();
	const textColor = { light: "teal.200", dark: "blue.200" };
	const bgColor = { light: "teal.200", dark: "blue.200" };
	const color = { light: "black", dark: "white" };
	let navBarContent = null;
	if (fetchingUserData) {
		navBarContent = null;
	} else if (
		userData === undefined ||
		userData === null ||
		!userData.currentUser
	) {
		// user is not logged in
		navBarContent = (
			<HStack spacing="5" display={{ base: "none", md: "flex" }}>
				<Link
					aria-label="Go to Chakra UI GitHub page"
					href="https://github.com/winston-lim/sg-uni-hacks-web"
				>
					<Icon
						as={GithubIcon}
						display="block"
						transition="color 0.2s"
						w="5"
						h="5"
						_hover={{ color: "gray.600" }}
					/>
				</Link>
				<NextLink href="/login">
					<Button
						color={color[colorMode]}
						bgColor={bgColor[colorMode]}
						as={Link}
						mr={5}
					>
						Login
					</Button>
				</NextLink>
				<DarkModeSwitch />
			</HStack>
		);
	} else {
		//user is logged in
		navBarContent = (
			<HStack spacing="5" display={{ base: "none", md: "flex" }}>
				<Link
					aria-label="Go to Chakra UI GitHub page"
					href="https://github.com/winston-lim/sg-uni-hacks-web"
				>
					<Icon
						as={GithubIcon}
						display="block"
						transition="color 0.2s"
						w="5"
						h="5"
						_hover={{ color: "gray.600" }}
					/>
				</Link>
				<Link aria-label="Go to submissions" href="/">
					<Icon
						as={FaFile}
						display="block"
						transition="color 0.2s"
						w="5"
						h="5"
						_hover={{ color: "gray.600" }}
					/>
				</Link>
				<Button background="transparent" aria-label="Go to profile" href="/">
					<Flex align="center">
						<Icon
							as={FaAddressCard}
							display="block"
							transition="color 0.2s"
							w="5"
							h="5"
							_hover={{ color: "gray.600" }}
						/>
						<SizedBox width={1.5} />
						<Box mr={2} textColor={textColor[colorMode]} fontWeight={600}>
							{userData.currentUser.username}
						</Box>
					</Flex>
				</Button>
				<Flex align="center">
					<NextLink href="/create">
						<Button
							color={color[colorMode]}
							bgColor={bgColor[colorMode]}
							as={Link}
							mr={5}
						>
							create
						</Button>
					</NextLink>
					<Button
						onClick={async () => {
							await logout();
							router.push("/");
							router.reload();
						}}
						isLoading={fetchingLogout}
						variant="link"
						textColor={color[colorMode]}
						fontWeight={700}
					>
						Logout
					</Button>
				</Flex>
				<DarkModeSwitch />
			</HStack>
		);
	}
	return <>{navBarContent}</>;
};
