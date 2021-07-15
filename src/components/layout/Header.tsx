import React from "react";
import {
	Box,
	chakra,
	Flex,
	Heading,
	useColorMode,
	Link,
	HStack,
	Icon,
	useDisclosure,
	useUpdateEffect,
} from "@chakra-ui/react";
import { useViewportScroll } from "framer-motion";
import NextLink from "next/link";
import { SearchBar } from "../forms/SearchBar";
import { FaAddressCard, FaFile } from "react-icons/fa";
import { DarkModeSwitch } from "../icons/DarkModeSwitch";
import { MobileNavButton } from "../icons/MenuButton";
import { MobileNavContent } from "../overlay/MobileNavContent";

const GithubIcon = (props: React.ComponentProps<"svg">) => (
	<svg viewBox="0 0 20 20" {...props}>
		<path
			fill="currentColor"
			d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"
		/>
	</svg>
);

interface HeaderContentProps {}

export const HeaderContent: React.FC<HeaderProps> = ({}) => {
	const mobileNav = useDisclosure();
	const mobileNavBtnRef = React.useRef<HTMLButtonElement>(null);
	useUpdateEffect(() => {
		mobileNavBtnRef.current?.focus();
	}, [mobileNav.isOpen]);
	return (
		<>
			<Flex w="100%" h="100%" px="6" align="center" justify="space-between">
				<Flex align="center">
					<NextLink href="/" passHref>
						<Heading color="teal.400" fontSize={{ sm: "md", md: "4xl" }}>
							<Link>S.U.H</Link>
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
					<SearchBar display={{ base: "none", md: "flex" }} />
					<HStack spacing="5" display={{ base: "none", md: "flex" }}>
						<Link
							isExternal
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
						<Link isExternal aria-label="Go to profile" href="/">
							<Icon
								as={FaAddressCard}
								display="block"
								transition="color 0.2s"
								w="5"
								h="5"
								_hover={{ color: "gray.600" }}
							/>
						</Link>
						<Link isExternal aria-label="Go to submissions" href="/">
							<Icon
								as={FaFile}
								display="block"
								transition="color 0.2s"
								w="5"
								h="5"
								_hover={{ color: "gray.600" }}
							/>
						</Link>
						<DarkModeSwitch />
					</HStack>
					<MobileNavButton
						ref={mobileNavBtnRef}
						aria-label="Open Menu"
						onClick={mobileNav.onOpen}
						display={{ base: "flex", md: "none" }}
					/>
				</Flex>
			</Flex>
			<MobileNavContent isOpen={mobileNav.isOpen} onClose={mobileNav.onClose} />
		</>
	);
};

interface HeaderProps {}

export const Header: React.FC<HeaderProps> = (props) => {
	const { colorMode } = useColorMode();
	const colors = { dark: "white", light: "grey.800" };
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
			width="full"
			{...props}
		>
			<chakra.div height="4.5rem" mx="auto" maxW="8xl">
				<HeaderContent />
			</chakra.div>
		</Box>
	);
};
