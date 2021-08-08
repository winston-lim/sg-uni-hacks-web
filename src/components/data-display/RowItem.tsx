import {
	Button,
	Link,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverFooter,
	PopoverHeader,
	PopoverTrigger,
	Stack,
	Td,
	Tr,
	Text,
} from "@chakra-ui/react";
import React from "react";
import { CheckCircleIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { OperationResult } from "urql";
import { ColorConfig } from "../../types/default";
import { delay } from "../../utils/delay";
import router, { NextRouter } from "next/router";

interface RowItemProps {
	title: string;
	description: string;
	createdAt: string;
	s3Url: string | undefined;
	verified: boolean;
	id: string;
	deleteHack(id: any): Promise<OperationResult>;
	colorConfig: ColorConfig;
	setAlert: React.Dispatch<React.SetStateAction<string>>;
	verifyHack?: () => Promise<OperationResult>;
}

export const RowItem: React.FC<RowItemProps> = ({
	title,
	description,
	createdAt,
	s3Url,
	verified,
	id,
	colorConfig,
	deleteHack,
	setAlert,
	verifyHack,
}) => {
	const colorMode = colorConfig.colorMode;
	const date = new Date();
	date.setTime(parseInt(createdAt));

	const fileUploadLinks = s3Url ? JSON.parse(s3Url) : undefined;

	const handleQuery = async (operation: any, args?: any) => {
		const response = await operation(args);
		if (response.error) {
			setAlert(`error: ${response.error.message}`);
			await delay(3000);
			setAlert("");
			return;
		}
		const operationName = `${
			operation !== verifyHack
				? "deleteHack"
				: response.data["verifyHack"]
				? "verifyHack"
				: "verifyUpdate"
		}`;
		if (response.data[operationName]) {
			setAlert(
				operationName === "verifyHack"
					? "successfully verified hack"
					: operationName === "verifyUpdate"
					? "successfully updated hack"
					: "sucessfully deleted hack"
			);
			console.log("success: ", response.data[operationName]);
			await delay(2000);
			setAlert("");
		} else {
			setAlert("error: operation failed, try again");
		}
	};
	return (
		<Tr key={id}>
			<Td>{title}</Td>
			<Td>{description === "" ? "NIL" : description + "..."}</Td>
			<Td>{date.toLocaleString()}</Td>
			<Td>
				{fileUploadLinks ? (
					<Stack spacing={5}>
						{fileUploadLinks.documentLinks ? (
							<Stack spacing={1}>
								<Text>Documents: </Text>
								{fileUploadLinks.documentLinks.map((link: string) => {
									return (
										<Link key={link} ml={2} href={link} isExternal>
											<u>Link</u>
										</Link>
									);
								})}
							</Stack>
						) : undefined}
						{fileUploadLinks.otherLinks ? (
							<Stack spacing={1}>
								<Text>Others: </Text>
								{fileUploadLinks.otherLinks.map((link: string) => {
									return (
										<Link key={link} ml={2} href={link} isExternal>
											<u>Link</u>
										</Link>
									);
								})}
							</Stack>
						) : undefined}
						{!fileUploadLinks ? <SmallCloseIcon /> : undefined}
					</Stack>
				) : (
					<SmallCloseIcon />
				)}
			</Td>
			<Td>
				{!!verified ? <CheckCircleIcon color="green" /> : <SmallCloseIcon />}
			</Td>
			{!!verifyHack ? (
				<Td>
					<Link href={`/update/${id}`}>
						<u>Link</u>
					</Link>
				</Td>
			) : null}
			<Td>
				{!!verifyHack ? (
					<Popover>
						{({ onClose }) => (
							<>
								<PopoverTrigger>
									<Button bgColor={colorConfig.bgColor![colorMode]}>
										Verify
									</Button>
								</PopoverTrigger>
								<PopoverContent>
									<PopoverArrow />
									<PopoverCloseButton />
									<PopoverHeader>Confirmation!</PopoverHeader>
									<PopoverBody>
										Are you sure you want to verify this submission?
									</PopoverBody>
									<PopoverFooter>
										<Button
											onClick={async () => {
												onClose();
												await handleQuery(verifyHack, { id });
											}}
											mr={5}
											bgColor="green"
										>
											Yes
										</Button>
										<Button bgColor="blackAlpha.400" onClick={onClose}>
											No
										</Button>
									</PopoverFooter>
								</PopoverContent>
							</>
						)}
					</Popover>
				) : !!verified ? (
					<Link href={`/posts/${id}`}>
						<u>Link</u>
					</Link>
				) : (
					"Pending"
				)}
			</Td>

			<Td>
				<Popover>
					{({ onClose }) => (
						<>
							<PopoverTrigger>
								<Button bgColor={colorConfig.errorColor![colorMode]}>
									Delete
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								<PopoverArrow />
								<PopoverCloseButton />
								<PopoverHeader>Confirmation!</PopoverHeader>
								<PopoverBody>
									Are you sure you want to delete this submission
								</PopoverBody>
								<PopoverFooter>
									<Button
										onClick={async () => {
											onClose();
											await handleQuery(deleteHack, { id });
										}}
										mr={5}
										bgColor="red"
									>
										Yes
									</Button>
									<Button bgColor="blackAlpha.400" onClick={onClose}>
										No
									</Button>
								</PopoverFooter>
							</PopoverContent>
						</>
					)}
				</Popover>
			</Td>
		</Tr>
	);
};
