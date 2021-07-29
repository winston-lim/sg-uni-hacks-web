import { Box } from "@chakra-ui/react";
import React from "react";

interface FillerProps {
	relativeContainerId?: string;
}

export const Filler: React.FC<FillerProps> = ({ relativeContainerId }) => {
	if (!relativeContainerId) return null;
	const div = document.getElementById(relativeContainerId);
	const height = div!.offsetHeight;
	const remainingHeight = window.innerHeight - height;
	return <Box h={remainingHeight} />;
};
