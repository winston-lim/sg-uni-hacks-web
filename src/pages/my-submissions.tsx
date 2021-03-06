import {
	Box,
	Flex,
	Heading,
	useBreakpointValue,
	Table,
	TableCaption,
	Tbody,
	Th,
	Thead,
	Tr,
	useColorMode,
} from "@chakra-ui/react";
import { Main } from "../components/layout/Main";
import React, { useState } from "react";
import { SizedBox } from "../components/layout/SizedBox";
import { Header } from "../components/layout/Header";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { BasicFooter } from "../components/layout/BasicFooter";
import { SizedWrapper } from "../components/layout/SizedWrapper";
import { useDeleteHackMutation, useUserHacksQuery } from "../generated/graphql";
import { useEffect } from "react";
import { RowItem } from "../components/data-display/RowItem";
import { Alert } from "../components/overlay/Alert";
import { ColorConfig } from "../types/ColorConfig";

const MySubmission = () => {
	const headerFontSize = useBreakpointValue({ base: "lg", md: "2xl" });
	const [{ data, fetching }, getUserHacks] = useUserHacksQuery();
	const [alert, setAlert] = useState<string>("");
	const [, deleteHack] = useDeleteHackMutation();
	useEffect(() => {
		getUserHacks();
	}, []);
	const tableSizeVariant = useBreakpointValue({
		base: "sm",
		md: "md",
		lg: "lg",
	});
	const { colorMode } = useColorMode();
	const colorConfig: ColorConfig = {
		colorMode: colorMode,
		colorScheme: { dark: "blue", light: "teal" },
		errorColor: { dark: "pink", light: "pink" },
		color: { dark: "white", light: "black" },
		bgColor: { dark: "blue.200", light: "teal.300" },
	};
	let tableContent = null;
	let tableRows = null;
	if (fetching) {
		tableContent = null;
	} else if (!fetching && !data?.userHacks) {
		tableContent = <Tr>No submissions</Tr>;
	} else {
		console.log("data: ", data);
		const rows = data?.userHacks.map((hack) => {
			return (
				<RowItem
					key={hack.id}
					id={hack.id}
					title={hack.title}
					description={hack.descriptionSnippet}
					createdAt={hack.createdAt}
					s3Url={hack.s3Url ? hack.s3Url : undefined}
					verified={hack.verified}
					deleteHack={deleteHack}
					colorConfig={colorConfig}
					setAlert={setAlert}
				/>
			);
		});
		tableContent = <>{rows}</>;
		tableRows = rows?.length;
	}
	return (
		<>
			<Header headerVariant="default" />
			<Main footer={<BasicFooter />}>
				<SizedBox height={10} />
				<SizedWrapper
					width={
						{ base: "100vw", sm: "100vw", md: "1000px", lg: "1600px" } as any
					}
				>
					<Flex direction="column" maxW="80%" mx="auto" alignItems="center">
						<Heading mb={10} size={headerFontSize}>
							my submissions
						</Heading>
						<Alert alert={alert} />
						<Box
							as={Table}
							size={tableSizeVariant}
							variant="striped"
							colorScheme={colorConfig.colorScheme[colorMode]}
							id="chakra-table"
						>
							<Box as={TableCaption}>
								<i>{`number of submissions: ${tableRows}`}</i>
							</Box>
							<Box as={Thead}>
								<Tr>
									<Th>title</Th>
									<Th>description</Th>
									<Th>created at</Th>
									<Th>file upload</Th>
									<Th>verified</Th>
									<Th>link to view</Th>
									<Th>delete</Th>
								</Tr>
							</Box>
							<Box as={Tbody}>{tableContent}</Box>
							{/* <Tfoot>
								<Tr>
									<Th>To convert</Th>
									<Th>into</Th>
									<Th isNumeric>multiply by</Th>
								</Tr>
							</Tfoot> */}
						</Box>
					</Flex>
					<SizedBox height={15} />
				</SizedWrapper>
			</Main>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(MySubmission);
