import { Drawer, Icon, IconButton } from "@chakra-ui/react";
import React from "react";
import { FaBars } from "react-icons/fa";

interface MobileNavButtonProps {
	display?: any;
	ref?: React.RefObject<HTMLButtonElement>;
	onClick(): void;
}

export const MobileNavButton: React.FC<MobileNavButtonProps> = ({
	display,
	ref,
	onClick,
}) => {
	return (
		<IconButton
			variant="outline"
			colorScheme="teal"
			display={display}
			ref={ref}
			onClick={onClick}
			aria-label="Send email"
			icon={<Icon as={FaBars} />}
		/>
	);
};
