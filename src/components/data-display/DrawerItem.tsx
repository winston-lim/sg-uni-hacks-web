import React from "react";
import NextLink from "next/link";
import { Heading, Link, useColorMode } from "@chakra-ui/react";
interface DrawerItemProps {
	title: string;
	href: string;
}

export const DrawerItem: React.FC<DrawerItemProps> = ({ title, href }) => {
	const { colorMode } = useColorMode();

	const color = { dark: "teal.200", light: "blue.200" };
	return (
		<NextLink href={href}>
			<Link fontSize="xxl" color={color[colorMode]} as={Heading}>
				{title}
			</Link>
		</NextLink>
	);
};
