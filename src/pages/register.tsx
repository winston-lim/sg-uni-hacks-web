import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useRouter } from "next/router";
import { toErrorMap } from "../utils/toErrorMap";
import { useRegisterMutation } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { InputField } from "../components/forms/InputField";
import { ColorModeWrapper } from "../components/layout/ColorModeWrapper";
import { Main } from "../components/layout/Main";
import { SizedBox } from "../components/layout/SizedBox";
import { SizedWrapper } from "../components/layout/SizedWrapper";
import { SizedHeading } from "../components/typography/SizedHeading";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
	const router = useRouter();
	const [, register] = useRegisterMutation();
	const footerElement = (
		<Flex direction="row" justifyContent="center">
			<Text>Uni Hacks 2021</Text>;
		</Flex>
	);
	return (
		<ColorModeWrapper>
			<Main footer={footerElement}>
				<SizedBox height={20} />
				<SizedWrapper variant="sm">
					<SizedHeading variant="xl" title="Sign up" />
					<SizedBox height={15} />
					<Formik
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
								/>
								<Box mt={4}>
									<InputField name="email" placeholder="email" label="Email" />
								</Box>
								<Box mt={4}>
									<InputField
										name="password"
										placeholder="password"
										label="Password"
										type="password"
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
				</SizedWrapper>
			</Main>
		</ColorModeWrapper>
	);
};

export default withUrqlClient(createUrqlClient)(Register);
