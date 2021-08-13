import { Icon, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaBars } from "react-icons/fa";

interface MenuButtonProps {
	display?: any;
	buttonRef?: React.RefObject<HTMLButtonElement>;
	onClick(): void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({
	display,
	buttonRef,
	onClick,
}) => {
	return (
		<IconButton
			variant="outline"
			colorScheme="teal"
			display={display}
			ref={buttonRef}
			onClick={onClick}
			aria-label="Send email"
			icon={<Icon as={FaBars} />}
		/>
	);
};
