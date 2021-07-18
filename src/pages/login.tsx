import { Box, Button, Flex, Link, Text } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useRouter } from "next/router";
import { toErrorMap } from "../utils/toErrorMap";
import { InputField } from "../components/forms/InputField";
import { ColorModeWrapper } from "../components/layout/ColorModeWrapper";
import { useLoginMutation } from "../generated/graphql";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import NextLink from "next/link";
import { ResponsiveWrapper } from "../components/layout/ResponsiveWrapper";
import { SizedHeading } from "../components/typography/SizedHeading";
import { SizedBox } from "../components/layout/SizedBox";
import { Main } from "../components/layout/Main";
import { BasicFooter } from "../components/layout/BasicFooter";
import { DarkModeSwitch } from "../components/icons/DarkModeSwitch";

export const Login: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [, login] = useLoginMutation();
	return (
		<>
			<DarkModeSwitch isFixed={true} />
			<Main footer={<BasicFooter />}>
				<SizedBox height={20} />
				<ResponsiveWrapper>
					<SizedHeading variant="xl" title="Sign in" />
					<SizedBox height={15} />
					<Formik
						initialValues={{ usernameOrEmail: "", password: "" }}
						onSubmit={async (values, { setErrors }) => {
							const response = await login(values);
							if (response.data?.login.errors) {
								setErrors(toErrorMap(response.data.login.errors));
							} else if (response.data?.login.user) {
								if (typeof router.query.next === "string") {
									router.push(router.query.next);
								} else {
									router.push("/");
								}
							}
						}}
					>
						{({ isSubmitting }) => (
							<Form>
								<InputField
									name="usernameOrEmail"
									placeholder="username or email"
									label="Username or Email"
								/>
								<Box mt={4}>
									<InputField
										name="password"
										placeholder="password"
										label="Password"
										type="password"
									/>
								</Box>
								<Flex mt="2">
									<NextLink href="/forget-password">
										<Link ml="auto">Forgot password?</Link>
									</NextLink>
								</Flex>
								<Button
									mt={4}
									type="submit"
									colorScheme="teal"
									isLoading={isSubmitting}
								>
									Login
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

export default withUrqlClient(createUrqlClient)(Login);
