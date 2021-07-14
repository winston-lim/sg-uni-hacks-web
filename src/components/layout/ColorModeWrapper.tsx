import React from "react";
import { Container } from "./Container";
import { DarkModeSwitch } from "../overlay/DarkModeSwitch";

export const ColorModeWrapper: React.FC<{}> = ({ children }) => {
	return (
		<Container height="100vh">
			{children}
			<DarkModeSwitch />
		</Container>
	);
};
