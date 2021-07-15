import React from "react";
import { Container } from "./Container";
import { DarkModeSwitch } from "../icons/DarkModeSwitch";

export const ColorModeWrapper: React.FC<{}> = ({ children }) => {
	return (
		<Container height="100%">
			{children}
			<DarkModeSwitch />
		</Container>
	);
};
