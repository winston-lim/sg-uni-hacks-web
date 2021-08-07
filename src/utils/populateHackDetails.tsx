import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Hack } from "../generated/graphql";

export const populateHackDetails = (hack: Hack): JSX.Element[] => {
	const props = Object.keys(hack) as string[];
	const filteredProps = props.filter((prop) => {
		if (
			prop === "__typename" ||
			prop === "creator" ||
			prop === "createdAt" ||
			prop === "voteStatus" ||
			prop === "points"
		) {
			return false;
		}
		return true;
	});
	console.log("filteredProps: ", filteredProps);
	const sanitizeHackData = (propName: any) => {
		const data = (hack as any)[propName];
		if (propName === "body") {
			return JSON.stringify(hack.body);
		}
		if (propName === "updatedAt") {
			return new Date(parseInt(data) / 1000).toLocaleString();
		}
		if ((hack as any)[propName] === null) {
			return "null";
		}
		return data;
	};
	const content = filteredProps.map((prop) => {
		return (
			<Box key={prop}>
				<Text>
					{prop}: {sanitizeHackData(prop)}
				</Text>
			</Box>
		);
	});
	console.log(content);
	return content;
};
