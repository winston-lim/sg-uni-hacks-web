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
import { QuickSubmissionValidationSchema } from "../utils/validationSchemas";

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
								validationSchema={QuickSubmissionValidationSchema}
								initialValues={{
									title: "",
									category: "",
									description: "",
									body: "",
									documentFiles: [],
									coverImage: [],
								}}
								onSubmit={async (values, { setErrors }) => {
									const {
										documentFiles,
										coverImage,
										description,
										body,
										...remainingValues
									} = values;
									if (
										documentFiles.length < 1 &&
										(description.length === 0 || body.length === 0)
									) {
										return setErrors({
											description:
												"if no document is uploaded, a description and body is required",
											body: "if no document is uploaded, a description and body is required",
										});
									}
									if (description.length < 15 && documentFiles.length === 0) {
										return setErrors({
											description: "description is too short",
										});
									}
									if (body.length < 20 && documentFiles.length === 0) {
										return setErrors({
											body: "body is too short",
										});
									}
									const hackInput: CreateHackInput = {
										...remainingValues,
										description,
										body,
									};
									const uploadLinks = {} as any;
									if (documentFiles.length > 0) {
										const response = await uploadFileToS3(
											documentFiles,
											user!.id
										);
										console.log("Uploaded document: ", response);
										uploadLinks["documentLinks"] = response;
									}
									if (coverImage.length > 0) {
										const response = await uploadFileToS3(coverImage, user!.id);
										console.log("Uploaded coverImage: ", response);
										uploadLinks["otherLinks"] = response;
									}
									if (
										uploadLinks["documentLinks"] ||
										uploadLinks["otherLinks"]
									) {
										hackInput.s3Url = JSON.stringify(uploadLinks);
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
												name="documentFiles"
												placeholder="Upload document(s)"
												label="upload document(s)"
												colorConfig={colorConfig}
												size={600}
											/>
										</Box>
										<Box mt={4}>
											<FileInputField
												name="coverImage"
												placeholder="Upload cover image"
												label="upload cover image"
												colorConfig={colorConfig}
												size={600}
												onlyImage={true}
												singleUpload={true}
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
