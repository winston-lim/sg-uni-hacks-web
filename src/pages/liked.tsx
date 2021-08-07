import { useColorMode, Heading, Flex, Button } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { HackItem } from "../components/data-display/HackItem";
import { MainItem } from "../components/data-display/MainItem";
import { BasicFooter } from "../components/layout/BasicFooter";
import { FractionContainer } from "../components/layout/FractionContainer";
import { Header } from "../components/layout/Header";
import { Main } from "../components/layout/Main";
import { SizedBox } from "../components/layout/SizedBox";
import { SizedWrapper } from "../components/layout/SizedWrapper";
import { useUserLikedHacksQuery } from "../generated/graphql";
import { ColorConfig, fallbackBackgroundUrl } from "../types/default";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

interface LikedPageProps {}

export const LikedPage: React.FC<LikedPageProps> = ({}) => {
	useIsAuth();
	const router = useRouter();
	const [cursor, setCursor] = useState<string | null>(null);
	const variables = {
		limit: 4,
		cursor,
	};
	const [{ data, fetching }] = useUserLikedHacksQuery({
		variables,
	});

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
	} else if (!fetching && data?.userLikedHacks.hacks.length === 0) {
		console.log("no data");
		articleBlock = (
			<Heading fontSize={{ base: "xl", md: "2xl", lg: "4xl" }}>
				No posts available now
			</Heading>
		);
	} else {
		console.log("data: ", data);
		const hacks = data!.userLikedHacks.hacks;
		const dataItems = hacks.map((hack) => {
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
					voteStatus={hack.voteStatus!}
					updatedAt={hack.updatedAt}
					coverPhoto={hasCoverImage ? links.otherLinks : fallbackBackgroundUrl}
					key={hack.id}
					isLast={hacks![hacks!.length - 1] === hack}
				/>
			);
		});
		articleBlock = (
			<Flex align="center" mb={10} direction="column">
				{dataItems}
				{data && data!.userLikedHacks.hasMore ? (
					<Button
						onClick={() => {
							setCursor(
								data.userLikedHacks.hacks[data.userLikedHacks.hacks.length - 1]
									.updatedAt
							);
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
						child1={articleBlock!}
						child2={<MainItem colorConfig={colorConfig} />}
					/>
				</SizedWrapper>
			</Main>
		</>
	);
};

export default withUrqlClient(createUrqlClient)(LikedPage);
