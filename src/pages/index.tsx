import {
	Link as ChakraLink,
	Text,
	Code,
	List,
	ListIcon,
	ListItem,
	Box,
	Spacer,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { Main } from "../components/layout/Main";
import React from "react";
import { ResponsiveWrapper } from "../components/layout/ResponsiveWrapper";
import { SizedBox } from "../components/layout/SizedBox";
import { SizedHeading } from "../components/typography/SizedHeading";
import { Header } from "../components/layout/Header";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { BasicFooter } from "../components/layout/BasicFooter";
const Index = () => {
	return (
		<>
			<Header headerVariant="searchbar" />
			<Main footer={<BasicFooter />}>
				<SizedBox height={20} />
				<ResponsiveWrapper>
					<SizedHeading variant="xl" title="Sign in" />
					<SizedBox height={15} />
					<Text>
						Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code>.
					</Text>
					<List spacing={3} my={0}>
						<ListItem>
							<ListIcon as={CheckCircleIcon} color="green.500" />
							<ChakraLink href="https://chakra-ui.com" flexGrow={1} mr={2}>
								Chakra UI <LinkIcon />
							</ChakraLink>
						</ListItem>
						<ListItem>
							<ListIcon as={CheckCircleIcon} color="green.500" />
							<ChakraLink href="https://nextjs.org" flexGrow={1} mr={2}>
								Next.js <LinkIcon />
							</ChakraLink>
						</ListItem>
					</List>
				</ResponsiveWrapper>
				<Box h={{ base: 200, sm: 300, md: 450 }} bgColor="grey.800" />
			</Main>
		</>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
