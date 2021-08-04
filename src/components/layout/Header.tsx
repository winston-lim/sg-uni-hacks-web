import React from "react";
import {
	Box,
	chakra,
	Flex,
	Heading,
	useColorMode,
	Link,
	useDisclosure,
	useUpdateEffect,
	Text,
} from "@chakra-ui/react";
import { useViewportScroll } from "framer-motion";
import NextLink from "next/link";
import { SearchBar } from "../forms/SearchBar";
import { MenuButton } from "../icons/MenuButton";
import { MobileNavContent } from "../overlay/MobileNavContent";
import { NavBarContent } from "../navigation/NavBarContent";
import {
	useCurrentUserQuery,
	useLogoutMutation,
} from "../../generated/graphql";

interface HeaderContentProps {
	headerVariant: HeaderVariant;
	title?: string;
	setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
	colorMode: "light" | "dark";
}

export const HeaderContent: React.FC<HeaderContentProps> = ({
	colorMode,
	title,
	headerVariant,
	setSearchTerm,
}) => {
	const mobileNav = useDisclosure();
	const mobileNavBtnRef = React.useRef<HTMLButtonElement>(null);
	useUpdateEffect(() => {
		mobileNavBtnRef.current?.focus();
	}, [mobileNav.isOpen]);
	const [{ data: userData, fetching: fetchingUserData }] =
		useCurrentUserQuery();
	const [{ fetching: fetchingLogout }, logout] = useLogoutMutation();

	const colors = { light: "black", dark: "white" };
	const headerContent =
		headerVariant === "searchbar" ? (
			<SearchBar
				setSearchTerm={setSearchTerm!}
				display={{ base: "none", md: "flex" }}
			/>
		) : (
			<Text
				w={{ md: "500px", lg: "800px" }}
				color={colors[colorMode]}
				fontWeight={600}
				fontSize="4xl"
			>
				{title?.toLowerCase()}
			</Text>
		);
	return (
		<>
			<Flex maxW="100%" h="100%" px="6" align="center" justify="space-between">
				<Flex minW={{ base: 20, sm: 30, md: 100, lg: 125 }} align="center">
					<NextLink href="/" passHref>
						<Heading
							color="teal.400"
							fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "5xl" }}
						>
							<Link>
								<Text
									bgGradient="linear(to-l, blue.400, teal.400)"
									bgClip="text"
									fontWeight="extrabold"
								>
									S U H
								</Text>
							</Link>
						</Heading>
					</NextLink>
				</Flex>
				<Flex
					justify="flex-end"
					w="100%"
					align="center"
					color="gray.400"
					maxW="1100px"
				>
					{headerContent}
					<NavBarContent
						userData={userData}
						fetchingUserData={fetchingUserData}
						fetchingLogout={fetchingLogout}
						logout={logout}
					/>
					<MenuButton
						buttonRef={mobileNavBtnRef}
						aria-label="Open Menu"
						onClick={mobileNav.onOpen}
						display={{ base: "flex", md: "none" }}
					/>
				</Flex>
			</Flex>
			<MobileNavContent
				isOpen={mobileNav.isOpen}
				onClose={mobileNav.onClose}
				userData={userData}
				fetchingUserData={fetchingUserData}
				fetchingLogout={fetchingLogout}
				logout={logout}
			/>
		</>
	);
};

type HeaderVariant = "searchbar" | "title" | "default";
interface HeaderProps {
	headerVariant: HeaderVariant;
	title?: string;
	setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
}

export const Header: React.FC<HeaderProps> = ({
	headerVariant,
	title,
	setSearchTerm,
	...remainingProps
}) => {
	const { colorMode } = useColorMode();
	const colors = { light: "white", dark: "#171923" };
	const bg = colors[colorMode];
	const ref = React.useRef<HTMLHeadingElement>(null);
	const [y, setY] = React.useState(0);
	const { height = 0 } = ref.current?.getBoundingClientRect() ?? {};

	const { scrollY } = useViewportScroll();
	React.useEffect(() => {
		return scrollY.onChange(() => scrollY.get());
	}, [scrollY]);

	return (
		<Box
			ref={ref}
			shadow={y > height ? "sm" : undefined}
			transition="box-shadow 0.2s, background-color 0.2s"
			pos="sticky"
			top="0"
			zIndex="2"
			bg={bg}
			left="0"
			right="0"
			maxWidth="100vw"
			{...remainingProps}
		>
			<chakra.div height="4.5rem" mx="auto" maxW="8xl">
				<HeaderContent
					colorMode={colorMode}
					title={title}
					headerVariant={headerVariant}
					setSearchTerm={setSearchTerm}
				/>
			</chakra.div>
		</Box>
	);
};
