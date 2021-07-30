import {
	Flex,
	AlertIcon,
	AlertTitle,
	Alert as ChakraAlert,
} from "@chakra-ui/react";
import React from "react";

interface AlertProps {
	alert: string;
}

export const Alert: React.FC<AlertProps> = ({ alert }) => {
	return (
		<>
			{alert === "" ? null : (
				<Flex my={4} w="100%" justifyContent="center">
					<ChakraAlert
						maxW={{ base: "450px", md: "600px" }}
						status={alert.split(":")[0].includes("error") ? "error" : "success"}
					>
						<AlertIcon />
						<AlertTitle mr={2}>{alert}</AlertTitle>
					</ChakraAlert>
				</Flex>
			)}
		</>
	);
};
