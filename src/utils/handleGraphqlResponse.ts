import { OperationResult } from "urql";
import { delay } from "./delay";

export const handleGraphqlError = async (
	response: OperationResult,
	setAlert: React.Dispatch<React.SetStateAction<string>>
) => {
	console.log("ERROR: ", response.error);
	setAlert(`error: ${response.error!.message}`);
	await delay(3000);
	setAlert("");
};
export const handleGraphqlSuccess = async (
	response: OperationResult,
	setAlert: React.Dispatch<React.SetStateAction<string>>,
	mutationType: string,
	message: string
) => {
	console.log("SUCCESS - DATA: ", response.data[mutationType]);
	setAlert(message);
	await delay(2000);
	setAlert("");
	await delay(500);
};
