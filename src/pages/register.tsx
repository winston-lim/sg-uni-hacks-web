import { Box, Button, useColorMode } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useRouter } from "next/router";
import { toErrorMap } from "../utils/toErrorMap";
import { useRegisterMutation } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { InputField } from "../components/forms/InputField";
import { Main } from "../components/layout/Main";
import { SizedBox } from "../components/layout/SizedBox";
import { ResponsiveWrapper } from "../components/layout/ResponsiveWrapper";
import { SizedHeading } from "../components/typography/SizedHeading";
import { BasicFooter } from "../components/layout/BasicFooter";
import { ColorConfig } from "../types/default";
import { DarkModeSwitch } from "../components/icons/DarkModeSwitch";
import { RegistrationValidationSchema } from "../utils/validationSchemas";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
	const router = useRouter();
	const [, register] = useRegisterMutation();
	const { colorMode } = useColorMode();
	const colorConfig: ColorConfig = {
		colorMode: colorMode,
		colorScheme: { dark: "blue", light: "teal" },
		errorColor: { dark: "pink", light: "red" },
		color: { dark: "white", light: "black" },
		bgColor: { dark: "blue.200", light: "teal.300" },
	};
	return (
		<>
			<DarkModeSwitch isFixed={true} />
			<Main footer={<BasicFooter />}>
				<SizedBox height={20} />
				<ResponsiveWrapper>
					<Box w="100%" px={5}>
						<SizedHeading variant="xl" title="Sign up" />
						<SizedBox height={15} />
						<Formik
							validationSchema={RegistrationValidationSchema}
							initialValues={{ username: "", email: "", password: "" }}
							onSubmit={async (values, { setErrors }) => {
								const response = await register({ options: values });
								if (response.data?.register.errors) {
									setErrors(toErrorMap(response.data.register.errors));
								} else if (response.data?.register.user) {
									router.push("/");
								}
							}}
						>
							{({ isSubmitting }) => (
								<Form>
									<InputField
										name="username"
										placeholder="username"
										label="Username"
										colorConfig={colorConfig}
									/>
									<Box mt={4}>
										<InputField
											name="email"
											placeholder="email"
											label="Email"
											colorConfig={colorConfig}
										/>
									</Box>
									<Box mt={4}>
										<InputField
											name="password"
											placeholder="password"
											label="Password"
											type="password"
											colorConfig={colorConfig}
										/>
									</Box>
									<Button
										mt={4}
										type="submit"
										colorScheme="teal"
										isLoading={isSubmitting}
									>
										Register
									</Button>
								</Form>
							)}
						</Formik>
					</Box>
				</ResponsiveWrapper>
			</Main>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(Register);
