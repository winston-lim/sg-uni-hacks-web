import { CheckCircleIcon } from "@chakra-ui/icons";
import {
	Button,
	Flex,
	Heading,
	List,
	ListIcon,
	ListItem,
	Text,
	UnorderedList,
	useColorMode,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import router from "next/router";
import React from "react";
import { BasicFooter } from "../components/layout/BasicFooter";
import { Header } from "../components/layout/Header";
import { Main } from "../components/layout/Main";
import { ResponsiveWrapper } from "../components/layout/ResponsiveWrapper";
import { SizedBox } from "../components/layout/SizedBox";
import { ColorConfig } from "../types/default";
import { createUrqlClient } from "../utils/createUrqlClient";

interface aboutPageProps {}

export const AboutPage: React.FC<aboutPageProps> = ({}) => {
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
					<Flex w="100%" px={5} direction="column">
						<Heading fontSize={{ base: "3xl", md: "4xl", lg: "6xl" }}>
							S.U Hacks
						</Heading>
						<Text mt={4} mb={6} fontSize="lg" fontWeight={600}>
							S.U hacks is a curated collection of user contributions of life
							hacks
						</Text>
						<List spacing={1} my={0}>
							<ListItem>
								<ListIcon as={CheckCircleIcon} color="green.500" />
								<Text display="inline">
									Users can find hacks through the search bar or manually by
									category from the side bar
								</Text>
							</ListItem>
							<ListItem>
								<ListIcon as={CheckCircleIcon} color="green.500" />
								<Text display="inline">
									Users can also like a hack to save it and contribute by
									creating a submission themselves!
								</Text>
							</ListItem>
						</List>
						<Button
							mt={2}
							boxShadow={colorMode === "light" ? "md" : "inner"}
							colorScheme={colorConfig.colorScheme[colorMode]}
							color={colorConfig.color[colorMode]}
							bgColor={colorConfig.accentColor![colorMode]}
							onClick={() => {
								router.push("/quick-submission");
							}}
						>
							Create a submission
						</Button>
						<Text mt={8} mb={4} fontSize="lg" fontWeight={600}>
							<u>About the tech stack</u>
						</Text>
						<Text>
							<b>Languages:</b>
							Javascript Typescript, SQL
						</Text>
						<Text>
							<b>Front-end libaries/frameworks: </b>
							ChakraUI, NextJS, URQL GraphQL, React, React Notion X, Formik
						</Text>
						<Text>
							<b>Back-end libaries/frameworks: </b>
							PostgreSQL, TypeORM, Express, NodeJS, GraphQL, Jest
						</Text>
						<Text>
							<b>Tools: </b>
							Amazon S3, Docker {"&"} Kubernetes
						</Text>
						<Text>
							<b>Hosted on DigitalOcean</b>
						</Text>
						<Text my={8} fontSize="lg" fontWeight={600}>
							<u>How it works</u>
						</Text>
						<UnorderedList>
							<ListItem>
								Users contribute their ideas through two modes:
							</ListItem>
							<ListItem>
								{" "}
								-- a quick submission involves a form and file uploading
							</ListItem>
							<ListItem>
								{" "}
								-- a full submission involes writing into a text editor directly
							</ListItem>
							<ListItem>
								After a submission is made, it is not public facing until an
								admin verifies the submission
							</ListItem>
							<ListItem>
								This verification step involves the admin editing, styling and
								writing out a full article on Notion
							</ListItem>
							<ListItem>
								After a page is created on Notion, it is linked to its relevant
								user submission
							</ListItem>
							<ListItem>
								Once this is done, the submission is then public facing with the
								page rendering content directly its associated Notion Page
							</ListItem>
						</UnorderedList>
					</Flex>
				</ResponsiveWrapper>
			</Main>
		</>
	);
};
export default withUrqlClient(createUrqlClient)(AboutPage);
