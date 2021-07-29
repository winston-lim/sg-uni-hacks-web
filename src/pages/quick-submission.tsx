import {
	Alert,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Flex,
	Heading,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React, { useState } from "react";
import { FileInputField } from "../components/forms/FileInputField";
import { InputField } from "../components/forms/InputField";
import { SelectField } from "../components/forms/SelectField";
import { BasicFooter } from "../components/layout/BasicFooter";
import { Header } from "../components/layout/Header";
import { Main } from "../components/layout/Main";
import { ResponsiveWrapper } from "../components/layout/ResponsiveWrapper";
import { SizedBox } from "../components/layout/SizedBox";
import { CreateHackInput, useCreateHackMutation } from "../generated/graphql";
import { ColorConfig } from "../types/default";
import { createUrqlClient } from "../utils/createUrqlClient";
import {
	handleGraphqlError,
	handleGraphqlSuccess,
} from "../utils/handleGraphqlResponse";
import { uploadFileToS3 } from "../utils/uploadFileToS3";
import { useIsAuth } from "../utils/useIsAuth";

interface quickSubmissionProps {}

export const quickSubmission: React.FC<quickSubmissionProps> = ({}) => {
	const user = useIsAuth();
	const [, createHack] = useCreateHackMutation();
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
	return (
		<>
			<Header headerVariant="default" />
			<Main footer={<BasicFooter />}>
				<SizedBox height={15} />
				<ResponsiveWrapper>
					<Flex alignItems="center" direction="column">
						<Flex alignItems="center" direction="column">
							<Heading fontSize={{ base: "3xl", md: "4xl", lg: "6xl" }}>
								Quick Submission
							</Heading>
							<Box mt={4}>
								<Text>Have an idea? Submit a quick response here</Text>
							</Box>
							<Text>
								<u>or</u>
							</Text>
							<Button
								mt={2}
								boxShadow={colorMode === "light" ? "md" : "inner"}
								colorScheme={colorConfig.colorScheme[colorMode]}
								color={colorConfig.color[colorMode]}
								bgColor={colorConfig.accentColor![colorMode]}
								onClick={() => {
									router.push("/create");
								}}
							>
								Write a full submission instead
							</Button>
						</Flex>
						<Flex maxW={{ base: "450px", md: "500px", lg: "600px" }} pt={10}>
							<Formik
								initialValues={{
									title: "",
									category: "",
									description: "",
									body: "",
									file: "",
								}}
								onSubmit={async (values, { setErrors }) => {
									const { file, ...remainingValues } = values;
									const hackInput: CreateHackInput = {
										...remainingValues,
									};
									if (values.file !== "") {
										const response = await uploadFileToS3(
											file as unknown as File,
											user!.id
										);
										hackInput.s3Url = response[0];
									}
									const response = await createHack({
										input: hackInput,
									});
									if (response.error) {
										await handleGraphqlError(response, setAlert);
									} else if (response.data?.createHack) {
										await handleGraphqlSuccess(
											response,
											setAlert,
											"createHack",
											"successfully created a submission!"
										);
										router.push("/my-submissions");
									}
								}}
							>
								{({ isSubmitting }) => (
									<Form>
										<InputField
											name="title"
											placeholder="Title"
											label="Title of hack"
											colorConfig={colorConfig}
											size={600}
											required={true}
										/>
										<Box mt={4}>
											<SelectField
												name="category"
												placeholder="Select a  category"
												label="Category"
												colorConfig={colorConfig}
												required={true}
											/>
										</Box>
										<Box mt={4}>
											<InputField
												name="description"
												placeholder="Brief introduction"
												label="description"
												colorConfig={colorConfig}
												size={600}
											/>
										</Box>
										<Box mt={4}>
											<InputField
												name="body"
												placeholder="Further details: key points, links"
												label="body"
												colorConfig={colorConfig}
												size={600}
												textarea={true}
											/>
										</Box>
										<Box mt={4}>
											<FileInputField
												name="file"
												placeholder="Click to upload a file"
												label="upload a document"
												colorConfig={colorConfig}
												size={600}
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
export default withUrqlClient(createUrqlClient)(quickSubmission);
