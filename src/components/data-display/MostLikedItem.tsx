import { HStack, Stack, Text, Image, Link, Flex } from "@chakra-ui/react";
import React from "react";
import { ColorConfig } from "../../types/default";

interface MostLikedItemProps {
	id: string;
	title: string;
	body: string;
	category: string;
	updatedAt: string;
	duration: number;
	creatorName: string;
	colorConfig: ColorConfig;
	coverImage: string;
}

export const MostLikedItem: React.FC<MostLikedItemProps> = ({
	id,
	title,
	category,
	body,
	updatedAt,
	duration,
	creatorName,
	colorConfig,
	coverImage,
}) => {
	const colorMode = colorConfig.colorMode;
	const date = new Date();
	date.setTime(parseInt(updatedAt));
	return (
		<HStack align="flex-start" maxW="100%" spacing={5}>
			<Image boxSize="100" src={coverImage}></Image>
			<Stack w="100%" color={colorConfig.color[colorMode]} spacing={1}>
				<Text
					fontSize="sm"
					textColor={colorMode === "dark" ? "whiteAlpha.600" : "blackAlpha.600"}
				>
					<b>{creatorName}</b> in <b>{category}</b>
				</Text>
				<Text fontSize="lg">
					<b>{title}</b>
				</Text>
				<Text fontSize="md">
					{date.toLocaleDateString()} - {duration} min read
				</Text>
				<Flex justify="flex-end" w="100%">
					<Link color="green.500" href={`/posts/${id}`}>
						<u>View</u>
					</Link>
				</Flex>
			</Stack>
		</HStack>
	);
};
