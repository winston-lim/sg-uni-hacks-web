import {
	Link as ChakraLink,
	Text,
	Code,
	List,
	ListIcon,
	ListItem,
	Flex,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { Main } from "../components/layout/Main";
import React from "react";
import { SizedWrapper } from "../components/layout/SizedWrapper";
import { SizedBox } from "../components/layout/SizedBox";
import { SizedHeading } from "../components/typography/SizedHeading";
import { Header } from "../components/layout/Header";
import { Container } from "../components/layout/Container";
const Index = () => {
	const footerElement = (
		<Flex direction="row" justifyContent="center">
			<Text>Uni Hacks 2021</Text>
		</Flex>
	);
	return (
		<Container height="100%">
			<Header />
			<Main footer={footerElement}>
				<SizedBox height={20} />
				<SizedWrapper variant="sm">
					<SizedHeading variant="xl" title="Sign in" />
					<SizedBox height={15} />
					<Text>
						Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code>.
					</Text>
					<List spacing={3} my={0}>
						<ListItem>
							<ListIcon as={CheckCircleIcon} color="green.500" />
							<ChakraLink
								isExternal
								href="https://chakra-ui.com"
								flexGrow={1}
								mr={2}
							>
								Chakra UI <LinkIcon />
							</ChakraLink>
						</ListItem>
						<ListItem>
							<ListIcon as={CheckCircleIcon} color="green.500" />
							<ChakraLink
								isExternal
								href="https://nextjs.org"
								flexGrow={1}
								mr={2}
							>
								Next.js <LinkIcon />
							</ChakraLink>
						</ListItem>
					</List>
				</SizedWrapper>
			</Main>
		</Container>
	);
};

export default Index;
