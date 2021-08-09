import { CheckCircleIcon } from "@chakra-ui/icons";
import {
	Stack,
	StackDivider,
	Flex,
	Box,
	SimpleGrid,
	Button,
	List,
	ListItem,
	ListIcon,
	Text,
	Heading,
} from "@chakra-ui/react";
import router from "next/router";
import React from "react";
import { useMostLikedHacksQuery } from "../../generated/graphql";
import { ColorConfig, fallbackBackgroundUrl } from "../../types/default";
import {
	categoryToColorMapping,
	mapCategoryToColor,
} from "../../utils/mapCategoryToColor";
import { MostLikedItem } from "./MostLikedItem";

interface SideBarProps {
	colorConfig: ColorConfig;
}

export const SideBar: React.FC<SideBarProps> = ({ colorConfig }) => {
	const colorMode = colorConfig.colorMode;
	const [{ data, fetching }] = useMostLikedHacksQuery();
	let mostLikedBody = null;
	if (fetching) {
		mostLikedBody = <Heading>Loading...</Heading>;
	} else if (!fetching && data?.mostLikedHacks.length === 0) {
		mostLikedBody = <Heading>No data available</Heading>;
	} else if (data?.mostLikedHacks) {
		console.log("data: ", data);
		mostLikedBody = (
			<Stack maxW="100%">
				{data!.mostLikedHacks.map((hack) => {
					const links = hack.s3Url ? JSON.parse(hack.s3Url) : undefined;
					const hasCoverImage = !!links?.otherLinks;
					return (
						<MostLikedItem
							key={hack.id}
							id={hack.id}
							title={hack.title}
							body={hack.body}
							category={hack.category}
							creatorName={hack.creator.username}
							duration={hack.duration}
							updatedAt={hack.updatedAt}
							colorConfig={colorConfig}
							coverImage={
								hasCoverImage ? links.otherLinks : fallbackBackgroundUrl
							}
						/>
					);
				})}
			</Stack>
		);
	}
	return (
		<Stack
			maxH="100%"
			maxW="100%"
			spacing={10}
			divider={<StackDivider borderColor="grey.200" />}
		>
			<Flex direction="column">
				<Text
					mb={5}
					fontSize="md"
					color={`${colorConfig.color[colorMode]}Alpha.400`}
				>
					<u>RECOMMENDED CATEGORIES</u>
				</Text>
				<SimpleGrid
					maxW="100%"
					columns={{ base: 2, md: 3 }}
					spacingX="3"
					spacingY="2"
				>
					{Object.keys(categoryToColorMapping).map((category) => {
						return (
							<Box key={category}>
								<Button
									size="sm"
									bgColor={mapCategoryToColor(category)}
									onClick={() => {
										router.push(`/categories/${category}`);
									}}
								>
									{category}
								</Button>
							</Box>
						);
					})}
				</SimpleGrid>
			</Flex>
			<Flex direction="column" justifyContent="center">
				<Text
					mb={5}
					fontSize="md"
					color={`${colorConfig.color[colorMode]}Alpha.400`}
				>
					<u>CONTRIBUTE</u>
				</Text>
				<List spacing={1} my={0}>
					<ListItem>
						<ListIcon as={CheckCircleIcon} color="green.500" />
						<Text display="inline">We want your ideas</Text>
					</ListItem>
					<ListItem>
						<ListIcon as={CheckCircleIcon} color="green.500" />
						<Text display="inline">
							Consider making a quick submission - a short summary of your ideas
						</Text>
					</ListItem>
					<ListItem>
						<ListIcon as={CheckCircleIcon} color="green.500" />
						<Text display="inline">
							Alternatively, there is also an option to write a full submission!
						</Text>
					</ListItem>
					<ListItem>
						<ListIcon as={CheckCircleIcon} color="green.500" />
						<Text display="inline">Find out more below</Text>
					</ListItem>
				</List>
				<Button
					mt={10}
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
			<Flex direction="column" maxW="100%" justifyContent="center">
				<Text
					mb={5}
					fontSize="md"
					color={`${colorConfig.color[colorMode]}Alpha.400`}
				>
					<u>POPULAR HACKS</u>
				</Text>
				{mostLikedBody}
			</Flex>
		</Stack>
	);
};
