import { Button, Flex, Heading, useColorMode } from "@chakra-ui/react";
import { Main } from "../components/layout/Main";
import React, { useEffect, useState } from "react";
import { SizedBox } from "../components/layout/SizedBox";
import { Header } from "../components/layout/Header";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { BasicFooter } from "../components/layout/BasicFooter";
import { SizedWrapper } from "../components/layout/SizedWrapper";
import { useRouter } from "next/router";
import { FractionContainer } from "../components/layout/FractionContainer";
import { useVerifiedHacksBySearchTermQuery } from "../generated/graphql";
import { HackItem } from "../components/data-display/HackItem";
import { ColorConfig, fallbackBackgroundUrl } from "../types/default";
import { SideBar } from "../components/data-display/SideBar";

const Index = () => {
	const [variables, setVariables] = useState({
		limit: 4,
		cursor: null as null | string,
		searchTerm: "",
	});
	const [searchTerm, setSearchTerm] = useState<string>("");
	useEffect(() => {
		setVariables({
			limit: variables.limit,
			cursor: variables.cursor,
			searchTerm,
		});
	}, [searchTerm]);

	const [{ data, fetching }] = useVerifiedHacksBySearchTermQuery({
		variables,
	});

	const router = useRouter();
	const { colorMode } = useColorMode();
	const colorConfig: ColorConfig = {
		colorMode: colorMode,
		colorScheme: { dark: "blue", light: "teal" },
		errorColor: { dark: "pink", light: "red" },
		color: { dark: "white", light: "black" },
		bgColor: { dark: "blue.200", light: "teal.200" },
		accentColor: { light: "white", dark: "#000d1a" },
	};
	let articleBlock = null;
	if (fetching) {
		articleBlock = (
			<Heading fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}>Loading</Heading>
		);
	} else if (!fetching && data?.verifiedHacksBySearchTerm.hacks.length === 0) {
		console.log("no data");
		articleBlock = (
			<Heading fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}>
				No posts available now
			</Heading>
		);
	} else {
		console.log("data", data);
		let hacks = data!.verifiedHacksBySearchTerm.hacks;
		const dataItems = hacks!.map((hack) => {
			const links = hack.s3Url ? JSON.parse(hack.s3Url) : undefined;
			const hasCoverImage = !!links?.otherLinks;
			return (
				<HackItem
					creator={hack.creator.username}
					router={router}
					id={hack.id}
					title={hack.title}
					category={hack.category}
					body={hack.body}
					colorConfig={colorConfig}
					descriptionSnippet={hack.descriptionSnippet}
					duration={hack.duration}
					likes={hack.points}
					updatedAt={hack.updatedAt}
					coverPhoto={hasCoverImage ? links.otherLinks : fallbackBackgroundUrl}
					voteStatus={hack.voteStatus!}
					key={hack.id}
					isLast={hacks![hacks!.length - 1] === hack}
				/>
			);
		});
		articleBlock = (
			<Flex align="center" mb={10} direction="column">
				{dataItems}
				{data && data.verifiedHacksBySearchTerm.hasMore ? (
					<Button
						onClick={() => {
							setVariables({
								limit: variables.limit,
								cursor:
									data.verifiedHacksBySearchTerm.hacks[
										data.verifiedHacksBySearchTerm.hacks.length - 1
									].updatedAt,
								searchTerm: variables.searchTerm,
							});
						}}
						isLoading={fetching}
						m="auto"
						my={8}
					>
						load more...
					</Button>
				) : null}
			</Flex>
		);
	}
	return (
		<>
			<Header setSearchTerm={setSearchTerm} headerVariant="searchbar" />
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
						child1={articleBlock!}
						child2={<SideBar colorConfig={colorConfig} />}
					/>
				</SizedWrapper>
			</Main>
		</>
	);
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
