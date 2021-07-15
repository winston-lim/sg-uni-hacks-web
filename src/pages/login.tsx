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
import { SizedWrapper } from "../components/layout/SizedWrapper";
import { SizedHeading } from "../components/typography/SizedHeading";
import { SizedBox } from "../components/layout/SizedBox";
import { Main } from "../components/layout/Main";

export const Login: React.FC<{}> = ({}) => {
	const router = useRouter();
	const [, login] = useLoginMutation();
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
				</SizedWrapper>
			</Main>
		</ColorModeWrapper>
	);
};

export default withUrqlClient(createUrqlClient)(Login);
