import React from "react";
import Head from "next/head";
import { getPageTitle, getAllPagesInSpace } from "notion-utils";
import { NotionAPI } from "notion-client";
import { NotionRenderer } from "react-notion-x";
import { GetStaticProps, GetStaticPropsContext } from "next";
import { ExtendedRecordMap } from "notion-types";
import { Main } from "../../components/layout/Main";
import { BasicFooter } from "../../components/layout/BasicFooter";
import { SizedBox } from "../../components/layout/SizedBox";
import { Flex, useColorMode } from "@chakra-ui/react";
import { ResponsiveWrapper } from "../../components/layout/ResponsiveWrapper";
import { Header } from "../../components/layout/Header";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";

// const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;

const notion = new NotionAPI({
	authToken: process.env.NOTION_API_KEY,
});

export const getStaticProps: GetStaticProps = async (
	context: GetStaticPropsContext
) => {
	const pageId = context.params!.id as string;
	const recordMap = await notion.getPage(pageId);

	return {
		props: {
			recordMap,
		},
		revalidate: 10,
	};
};

export async function getStaticPaths() {
	// if (isDev) {
	// 	return {
	// 		paths: [],
	// 		fallback: true,
	// 	};
	// }

	const rootNotionPageId = process.env.NOTION_DATABASE_ID!;

	// This crawls all public pages starting from the given root page in order
	// for next.js to pre-generate all pages via static site generation (SSG).
	// This is a useful optimization but not necessary; you could just as easily
	// set paths to an empty array to not pre-generate any pages at build time.
	const pages = await getAllPagesInSpace(
		rootNotionPageId,
		undefined,
		notion.getPage.bind(notion),
		{
			traverseCollections: false,
		}
	);

	const paths = Object.keys(pages).map((pageId) => `/posts/${pageId}`);

	return {
		paths,
		fallback: true,
	};
}

function NotionPage({ recordMap }: { recordMap: ExtendedRecordMap }) {
	if (!recordMap) {
		return null;
	}
	const { colorMode } = useColorMode();

	const title = getPageTitle(recordMap);

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<Header headerVariant="default" />
			<Main footer={<BasicFooter />}>
				<SizedBox height={15} />
				<ResponsiveWrapper>
					<Flex alignItems="center" direction="column">
						<NotionRenderer
							recordMap={recordMap}
							fullPage={true}
							darkMode={colorMode === "dark" ? true : undefined}
							bodyClassName="notion-block"
						/>
					</Flex>
				</ResponsiveWrapper>
			</Main>
		</>
	);
}

export default withUrqlClient(createUrqlClient, { ssr: false })(
	NotionPage as any
);
