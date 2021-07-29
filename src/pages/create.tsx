import {
	Link as ChakraLink,
	Text,
	List,
	ListIcon,
	ListItem,
	Flex,
	useColorMode,
	Heading,
	Box,
	Button,
	UnorderedList,
	AlertIcon,
	Alert,
	AlertTitle,
	CloseButton,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { Main } from "../components/layout/Main";
import React, { useState } from "react";
import { SizedBox } from "../components/layout/SizedBox";
import { Header } from "../components/layout/Header";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { BasicFooter } from "../components/layout/BasicFooter";
import { SizedWrapper } from "../components/layout/SizedWrapper";
import { FractionContainer } from "../components/layout/FractionContainer";
import EditorJS from "@editorjs/editorjs";
import dynamic from "next/dynamic";
import { EditorContainer } from "../components/layout/EditorContainer";
import ReactEditor, { EditorProps } from "../components/data-display/Editor";
import { useIsAuth } from "../utils/useIsAuth";
import { useRouter } from "next/router";
import { ColorConfig } from "../types/default";
const Create = () => {
	useIsAuth();
	const router = useRouter();
	let Editor;
	if (typeof window !== "undefined") {
		Editor = dynamic<EditorProps>(
			() => import("../components/data-display/Editor"),
			{
				ssr: false,
			}
		);
	}
	const [alert, setAlert] = useState<string>("");

	const { colorMode } = useColorMode();
	const colorConfig: ColorConfig = {
		colorMode: colorMode,
		colorScheme: { dark: "blue", light: "teal" },
		errorColor: { dark: "pink", light: "red" },
		color: { dark: "white", light: "black" },
		bgColor: { dark: "blue.200", light: "teal.200" },
		accentColor: { light: "teal.400", dark: "#4A5568" },
	};
	return (
		<>
			<Header headerVariant="default" />
			<Main footer={<BasicFooter />}>
				<SizedBox height={5} />
				<SizedWrapper
					width={
						{ base: "100vw", sm: "100vw", md: "800px", lg: "1200px" } as any
					}
				>
					<FractionContainer
						col1={7}
						col2={3}
						child1={
							<>
								<Heading fontSize={{ base: "3xl", md: "4xl", lg: "6xl" }}>
									Create a submission
								</Heading>
								<SizedBox height={15} />
								<Text fontSize="lg" fontWeight={400}>
									Write an article using{" "}
									<ChakraLink color={colorConfig.bgColor[colorMode]} href="">
										Editor.js{" "}
									</ChakraLink>
									and submit it for a review.
								</Text>
								<Flex mt={10} direction="column" alignItems="left">
									<Heading fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}>
										Before you start writing...
									</Heading>
									<UnorderedList spacing={1}>
										<ListItem>
											<Text>
												Your article will not be public before a review
											</Text>
										</ListItem>
										<ListItem>
											<Text>
												On review, an article is automatically populate with
												content and styles
											</Text>
										</ListItem>
										<ListItem>
											<Text>
												This means your submission need not be a full article
												but just certain key reflections or learnings
											</Text>
										</ListItem>
										<ListItem>
											<Text>Consider making a quick submission instead</Text>
										</ListItem>
									</UnorderedList>
								</Flex>
							</>
						}
						child2={
							<>
								<Flex height="100%" justifyContent="center">
									<List spacing={1} my={0}>
										<ListItem>
											<ListIcon as={CheckCircleIcon} color="green.500" />
											<Text display="inline">
												Administrators will verify your submission with 3 days
											</Text>
										</ListItem>
										<ListItem>
											<ListIcon as={CheckCircleIcon} color="green.500" />
											<Text display="inline">
												You may check the status of your submission by clicking
												on My Submissions
											</Text>
										</ListItem>
										<ListItem>
											<ListIcon as={CheckCircleIcon} color="green.500" />
											<Text display="inline">
												You may update your submission there also
											</Text>
										</ListItem>
										<ListItem>
											<ListIcon as={CheckCircleIcon} color="green.500" />
											<Text display="inline">
												Thank you for your contribution!
											</Text>
										</ListItem>
									</List>
								</Flex>
								<Flex mt={2} alignSelf="flex-start">
									<Button
										colorScheme={colorMode === "light" ? "green" : "blue"}
										color={colorConfig.color[colorMode]}
										bgColor={colorMode === "light" ? "green.300" : "blue.200"}
										boxShadow={colorMode === "light" ? "xl" : "inner"}
										onClick={() => {
											router.push("/quick-submission");
										}}
									>
										Make a Quick submission
									</Button>
								</Flex>
							</>
						}
					/>
					<SizedBox height={30} />
				</SizedWrapper>
				{alert === "" ? null : (
					<Flex mb={4} w="100%" justifyContent="center">
						<Alert
							maxW={{ base: "450px", md: "800px", lg: "1000px" }}
							status="error"
						>
							<AlertIcon />
							<AlertTitle mr={2}>{alert}</AlertTitle>
						</Alert>
					</Flex>
				)}
				<Box mb={20} id="editor-container" height="100%">
					{Editor && (
						<Editor
							setAlert={setAlert}
							router={router}
							borderColor={colorConfig.accentColor![colorMode]}
						></Editor>
					)}
				</Box>
			</Main>
		</>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Create);
