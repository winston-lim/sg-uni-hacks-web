import {
	Alert,
	AlertIcon,
	AlertTitle,
	Box,
	Button,
	Flex,
	HStack,
	Link,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { toErrorMap } from "../utils/toErrorMap";
import { InputField } from "../components/forms/InputField";
import {
	useForgotPasswordMutation,
	useLoginMutation,
} from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { ResponsiveWrapper } from "../components/layout/ResponsiveWrapper";
import { SizedHeading } from "../components/typography/SizedHeading";
import { SizedBox } from "../components/layout/SizedBox";
import { Main } from "../components/layout/Main";
import { BasicFooter } from "../components/layout/BasicFooter";
import { DarkModeSwitch } from "../components/icons/DarkModeSwitch";
import { ColorConfig } from "../types/default";
import login from "./login";
import {
	handleGraphqlError,
	handleGraphqlSuccess,
} from "../utils/handleGraphqlResponse";

export const ForgetPassword: React.FC<{}> = ({}) => {
	const router = useRouter();
	const { colorMode } = useColorMode();
	const colorConfig: ColorConfig = {
		colorMode: colorMode,
		colorScheme: { dark: "blue", light: "teal" },
		errorColor: { dark: "pink", light: "red" },
		color: { dark: "white", light: "black" },
		bgColor: { dark: "blue.200", light: "teal.300" },
		accentColor: { dark: "white", light: "grey.700" },
	};
	const [alert, setAlert] = useState<string>("");
	const [, forgotPassword] = useForgotPasswordMutation();
	return (
		<>
			<DarkModeSwitch isFixed={true} />
			<Main footer={<BasicFooter />}>
				<SizedBox height={20} />
				<ResponsiveWrapper>
					<SizedHeading variant="xl" title="Forgot password" />
					<Box h={5} />
					<Text fontSize="lg">
						enter your email to request for a password change
					</Text>
					{alert === "" ? null : (
						<Flex my={4} w="100%" justifyContent="center">
							<Alert
								maxW={{ base: "450px", md: "600px" }}
								status={
									alert.split(":")[0].includes("error") ? "error" : "success"
								}
							>
								<AlertIcon />
								<AlertTitle mr={2}>{alert}</AlertTitle>
							</Alert>
						</Flex>
					)}
					<SizedBox height={15} />
					<Formik
						initialValues={{ email: "" }}
						onSubmit={async (values, { setErrors }) => {
							const response = await forgotPassword(values);
							if (response?.error) {
								await handleGraphqlError(response, setAlert);
								if (response.data?.forgotPassword === false) {
									setAlert("error: something went wrong, try again");
								}
							} else if (response.data?.forgotPassword) {
								await handleGraphqlSuccess(
									response,
									setAlert,
									"forgotPassword",
									"we will send you an email if the email is valid"
								);
								router.push("/");
							}
						}}
					>
						{({ isSubmitting }) => (
							<Form>
								<InputField
									name="email"
									placeholder="email"
									label="Email"
									colorConfig={colorConfig}
								/>
								<Button
									mt={5}
									type="submit"
									bgColor={colorConfig.bgColor[colorMode]}
									color="white"
									isLoading={isSubmitting}
								>
									Request for password reset
								</Button>
							</Form>
						)}
					</Formik>
				</ResponsiveWrapper>
			</Main>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(ForgetPassword);
