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
	Td,
	Tr,
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
	fileUpload?: string;
	verified: boolean;
	id: string;
	deleteHack(id: any): Promise<OperationResult>;
	colorConfig: ColorConfig;
	setAlert: React.Dispatch<React.SetStateAction<string>>;
	verifyHack?: () => Promise<OperationResult>;
	setRefetch: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RowItem: React.FC<RowItemProps> = ({
	title,
	description,
	createdAt,
	fileUpload,
	verified,
	id,
	colorConfig,
	deleteHack,
	setAlert,
	verifyHack,
	setRefetch,
}) => {
	const colorMode = colorConfig.colorMode;
	const date = new Date();
	date.setTime(parseInt(createdAt));
	const handleQuery = async (operation: any, args?: any) => {
		const response = await operation(args);
		const operationName = `${
			operation === verifyHack ? "verifyHack" : "deleteHack"
		}`;
		if (response.error) {
			setAlert(`error: ${response.error.message}`);
			await delay(3000);
			setAlert("");
		} else if (response.data[operationName]) {
			setAlert(
				operationName === "verify"
					? "successfully verified hack"
					: "sucessfully deleted hack"
			);
			console.log("success: ", response.data[operationName]);
			await delay(2000);
			setAlert("");
		} else {
			setAlert("error: operation failed, try again");
		}
		setRefetch(true);
	};
	return (
		<Tr key={id}>
			<Td>{title}</Td>
			<Td>{description === "" ? "NIL" : description + "..."}</Td>
			<Td>{date.toLocaleString()}</Td>
			<Td>
				{fileUpload ? <Link href={fileUpload}>File</Link> : <SmallCloseIcon />}
			</Td>
			<Td>
				{!!verified ? <CheckCircleIcon color="green" /> : <SmallCloseIcon />}
			</Td>
			{!!verifyHack ? (
				<Td>
					<Link href={`localhost:3000/update/${id}`}>Link</Link>
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
					<Link href={`localhost:3000/post/${id}`}>Link</Link>
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
