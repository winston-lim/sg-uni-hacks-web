import {
	Box,
	Button,
	Flex,
	HStack,
	Link,
	useColorMode,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { useRouter } from "next/router";
import { toErrorMap } from "../utils/toErrorMap";
import { InputField } from "../components/forms/InputField";
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
import { LoginValidationSchema } from "../utils/validationSchemas";
import { ColorConfig } from "../types/ColorConfig";

export const Login: React.FC<{}> = ({}) => {
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
	const [, login] = useLoginMutation();
	return (
		<>
			<DarkModeSwitch isFixed={true} />
			<Main footer={<BasicFooter />}>
				<SizedBox height={20} />
				<ResponsiveWrapper>
					<Box w="100%" px={5}>
						<SizedHeading variant="xl" title="Sign in" />
						<SizedBox height={15} />
						<Formik
							validationSchema={LoginValidationSchema}
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
										colorConfig={colorConfig}
									/>
									<Box mt={4}>
										<InputField
											name="password"
											placeholder="password"
											label="Password"
											type="password"
											colorConfig={colorConfig}
										/>
									</Box>
									<Flex mt="2">
										<NextLink href="/forget-password">
											<Link ml="auto">Forgot password?</Link>
										</NextLink>
									</Flex>
									<HStack spacing={5} mt={4}>
										<Button
											type="submit"
											bgColor={colorConfig.bgColor[colorMode]}
											color="white"
											isLoading={isSubmitting}
										>
											Login
										</Button>
										<Button
											bgColor="whiteAlpha.900"
											boxShadow={colorMode === "light" ? "md" : "inner"}
											color="black"
											onClick={() => {
												router.push("register");
											}}
										>
											register instead
										</Button>
									</HStack>
								</Form>
							)}
						</Formik>
					</Box>
				</ResponsiveWrapper>
			</Main>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(Login);
