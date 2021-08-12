import { OperationResult } from "urql";
import { delay } from "./delay";

//setAlert will result in an Alert component being rendered if a non-empty string is passed in
export const handleGraphqlError = async (
	response: OperationResult,
	setAlert: React.Dispatch<React.SetStateAction<string>>
) => {
	setAlert(`error: ${response.error!.message}`);
	await delay(3000);
	setAlert("");
};
export const handleGraphqlSuccess = async (
	setAlert: React.Dispatch<React.SetStateAction<string>>,
	message: string
) => {
	setAlert(message);
	await delay(2000);
	setAlert("");
	await delay(500);
};
