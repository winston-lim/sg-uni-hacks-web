import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import "../styles.css";
import theme from "../theme";
import "react-notion-x/src/styles.css";

function MyApp({ Component, pageProps }: any) {
	return (
		<ChakraProvider resetCSS theme={theme}>
			<ColorModeProvider
				options={{
					useSystemColorMode: true,
				}}
			>
				<Component {...pageProps} />
			</ColorModeProvider>
		</ChakraProvider>
	);
}

export default MyApp;
