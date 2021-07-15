import React from "react";
import NextLink from "next/link";
interface DrawerItemProps {
	title: string;
	href: string;
}

export const DrawerItem: React.FC<DrawerItemProps> = ({ title, href }) => {
	return <NextLink href={href}>{title}</NextLink>;
};
