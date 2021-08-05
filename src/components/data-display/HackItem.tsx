import { CloseIcon, SmallCloseIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Flex,
	Heading,
	HStack,
	Icon,
	Image,
	Stack,
	Tag,
	Text,
} from "@chakra-ui/react";
import { NextRouter } from "next/router";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useVoteMutation } from "../../generated/graphql";
import { ColorConfig } from "../../types/default";
import { mapCategoryToColor } from "../../utils/mapCategoryToColor";
import { SizedBox } from "../layout/SizedBox";

interface HackItemProps {
	router: NextRouter;
	id: string;
	title: string;
	body: string;
	descriptionSnippet: string;
	duration: number;
	updatedAt: string;
	category: string;
	likes: number;
	coverPhoto: string;
	colorConfig: ColorConfig;
	isLast: boolean;
	creator: string;
	voteStatus: number;
}
export const HackItem: React.FC<HackItemProps> = ({
	router,
	id,
	title,
	body,
	descriptionSnippet,
	duration,
	updatedAt,
	category,
	likes,
	coverPhoto,
	colorConfig,
	isLast,
	creator,
	voteStatus,
}) => {
	const [{ fetching }, vote] = useVoteMutation();
	const colorMode = colorConfig.colorMode;

	const date = new Date();
	date.setTime(parseInt(updatedAt));

	return (
		<Box
			px="10"
			py="5"
			w={{ base: 360, md: 700 }}
			bgColor={colorConfig.accentColor![colorMode]}
			color={colorConfig.color[colorMode]}
			boxShadow="xl"
			mb={isLast ? undefined : 20}
		>
			<Stack spacing={5} align="center">
				<Heading>{title}</Heading>
				<Stack spacing={1}>
					<Flex justifyContent="flex-end">
						<Text fontSize="small">{`submitted by ${creator}`}</Text>
					</Flex>
					<Image w="560px" src={coverPhoto}></Image>
				</Stack>
				<Flex direction="row" justifyItems="flex-start" w="100%">
					<Text fontSize="md">{descriptionSnippet}...</Text>
				</Flex>
				<Flex
					w="100%"
					direction={{ base: "column", md: "row" }}
					justifyContent={{ base: "flex-start", md: "space-between" }}
				>
					<HStack
						w="100%"
						justifyContent="flex-start"
						alignItems="flex-end"
						spacing="5"
					>
						<Text fontSize="small">{`Less than ${duration} min`}</Text>
						<Text fontSize="small">{date.toLocaleDateString()}</Text>
						<Tag
							size="sm"
							variant="solid"
							bgColor={mapCategoryToColor(category)}
							fontSize="x-small"
						>
							{category.toUpperCase()}
						</Tag>
					</HStack>
					<HStack spacing={3}>
						<Button
							size="sm"
							aria-label="like"
							colorScheme="pink"
							bgColor="pink.400"
							color="white"
							onClick={async () => {
								await vote({
									hackId: id,
									value: voteStatus ? 0 : 1,
								});
							}}
							isLoading={fetching}
						>
							<Flex align="center">
								<Text fontSize="xs" mr={1}>
									{likes}
								</Text>
								<Icon
									as={FaHeart}
									display="block"
									transition="color 0.2s"
									w="4"
									h="4"
									color={voteStatus === 1 ? "pink.400 " : undefined}
								/>
								<SizedBox width={1.5} />
								<Box mr={2} fontWeight={600}>
									{voteStatus ? "Unlike" : "Like"}
								</Box>
							</Flex>
						</Button>
						<Button
							size="sm"
							aria-label="like"
							colorScheme={colorConfig.colorScheme[colorMode]}
							bgColor={colorConfig.bgColor[colorMode]}
							color={colorConfig.color[colorMode]}
							onClick={async () => {
								router.push(`/posts/${body}`);
							}}
							boxShadow={colorMode === "light" ? "lg" : "inner"}
						>
							{"View full article >>"}
						</Button>
					</HStack>
				</Flex>
			</Stack>
		</Box>
	);
};
