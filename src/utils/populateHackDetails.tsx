import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { Hack } from "../generated/graphql";

//Returns an array of Text components each containing 'field: value' of a specific graphql query response data, in this case, it accepts only a Hack
export const populateHackDetails = (hack: Hack): JSX.Element[] => {
	const props = Object.keys(hack) as string[];
	//filters fields that are not required
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
	//Certain field values cannot be directly placed as children of React components such as null
	//Instead, we parse them to a string or other forms
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
	return content;
};
