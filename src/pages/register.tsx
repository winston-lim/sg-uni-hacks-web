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
import { ResponsiveWrapper } from "../components/layout/ResponsiveWrapper";
import { SizedHeading } from "../components/typography/SizedHeading";
import { BasicFooter } from "../components/layout/BasicFooter";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
	const router = useRouter();
	const [, register] = useRegisterMutation();
	return (
		<>
			<Main footer={<BasicFooter />}>
				<SizedBox height={20} />
				<ResponsiveWrapper>
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
				</ResponsiveWrapper>
				<Box h={{ base: 200, sm: 300, md: 450, lg: 500 }} bgColor="grey.800" />
			</Main>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(Register);
