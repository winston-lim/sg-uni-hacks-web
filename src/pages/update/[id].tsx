import {
	Alert,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Flex,
	Heading,
	useColorMode,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/forms/InputField";
import { BasicFooter } from "../../components/layout/BasicFooter";
import { Header } from "../../components/layout/Header";
import { Main } from "../../components/layout/Main";
import { ResponsiveWrapper } from "../../components/layout/ResponsiveWrapper";
import { SizedBox } from "../../components/layout/SizedBox";
import {
	Hack,
	UpdateHackInput,
	useHackQuery,
	useUpdateHackMutation,
} from "../../generated/graphql";
import { ColorConfig } from "../../types/ColorConfig";
import { createUrqlClient } from "../../utils/createUrqlClient";
import {
	handleGraphqlError,
	handleGraphqlSuccess,
} from "../../utils/handleGraphqlResponse";
import { populateHackDetails } from "../../utils/populateHackDetails";
import { useIsAuth } from "../../utils/useIsAuth";

interface UpdatePageProps {}

export const UpdatePage: React.FC<UpdatePageProps> = ({}) => {
	useIsAuth();
	const router = useRouter();
	const hackId = typeof router.query.id === "string" ? router.query.id : "";
	const [{ data, fetching }] = useHackQuery({
		variables: {
			id: hackId,
		},
	});
	const [, updateHack] = useUpdateHackMutation();
	const [alert, setAlert] = useState<string>("");
	const { colorMode } = useColorMode();
	const colorConfig: ColorConfig = {
		colorMode: colorMode,
		colorScheme: { dark: "blue", light: "teal" },
		errorColor: { dark: "pink", light: "red" },
		color: { dark: "white", light: "black" },
		bgColor: { dark: "blue.200", light: "teal.200" },
		accentColor: { dark: "blue.400", light: "purple.200" },
	};
	let hackInfoBlock = null;
	if (fetching) {
		hackInfoBlock = null;
	} else if (!fetching && !data?.hack) {
		hackInfoBlock = <Heading>No fetched details</Heading>;
	} else {
		console.log("data: ", data);
		hackInfoBlock = (
			<Flex direction="column" align="center">
				{populateHackDetails(data!.hack! as Hack)}
			</Flex>
		);
	}
	return (
		<>
			<Header headerVariant="default" />
			<Main footer={<BasicFooter />}>
				<SizedBox height={15} />
				<ResponsiveWrapper>
					<Flex alignItems="center" direction="column">
						<Flex alignItems="center" direction="column">
							<Heading fontSize={{ base: "3xl", md: "4xl", lg: "6xl" }}>
								Update
							</Heading>
							{hackInfoBlock}
						</Flex>
						<Flex maxW={{ base: "450px", md: "500px", lg: "600px" }} pt={10}>
							<Formik
								initialValues={{
									body: "",
								}}
								onSubmit={async (values) => {
									const { body } = values;
									const hackInput: UpdateHackInput = {};
									if (body === "") {
										return;
									} else {
										hackInput.body = body;
									}
									const response = await updateHack({
										id: hackId as string,
										input: hackInput,
									});
									if (response.error) {
										await handleGraphqlError(response, setAlert);
									} else if (response.data?.updateHack) {
										await handleGraphqlSuccess(
											setAlert,
											"successfully updated a submission!"
										);
										router.push("/submissions");
									}
								}}
							>
								{({ isSubmitting }) => (
									<Form>
										<Box mt={4}>
											<InputField
												name="body"
												placeholder="Notion pageId"
												label="Body"
												colorConfig={colorConfig}
												size={600}
												required={true}
											/>
										</Box>
										{alert === "" ? null : (
											<Flex my={4} w="100%" justifyContent="center">
												<Alert
													maxW={{ base: "450px", md: "600px" }}
													status={
														alert.split(":")[0].includes("error")
															? "error"
															: "success"
													}
												>
													<AlertIcon />
													<AlertTitle mr={2}>{alert}</AlertTitle>
												</Alert>
											</Flex>
										)}
										<Flex justifyContent="flex-end" w="100%">
											<Button
												mt={10}
												type="submit"
												size="lg"
												colorScheme={colorConfig.colorScheme[colorMode]}
												color={colorConfig.color[colorMode]}
												bgColor={colorConfig.accentColor![colorMode]}
												boxShadow={colorMode === "light" ? "lg" : "inner"}
												isLoading={isSubmitting}
											>
												Submit
											</Button>
										</Flex>
									</Form>
								)}
							</Formik>
						</Flex>
					</Flex>
				</ResponsiveWrapper>
			</Main>
		</>
	);
};
export default withUrqlClient(createUrqlClient)(UpdatePage);
