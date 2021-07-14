import {
	Link as ChakraLink,
	Text,
	Code,
	List,
	ListIcon,
	ListItem,
} from "@chakra-ui/react";
import { CheckCircleIcon, LinkIcon } from "@chakra-ui/icons";
import { Container } from "../components/layout/Container";
import { Main } from "../components/layout/Main";
import { DarkModeSwitch } from "../components/overlay/DarkModeSwitch";
import { Footer } from "../components/layout/Footer";

const Index = () => (
	<Container height="100vh">
		<Main>
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
					<ChakraLink isExternal href="https://nextjs.org" flexGrow={1} mr={2}>
						Next.js <LinkIcon />
					</ChakraLink>
				</ListItem>
			</List>
		</Main>

		<DarkModeSwitch />
		<Footer>
			<Text>Next ❤️ Chakra</Text>
		</Footer>
	</Container>
);

export default Index;
