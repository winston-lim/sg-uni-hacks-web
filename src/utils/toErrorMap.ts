import { FieldError } from "../generated/graphql";

//For queries that return a FieldError, creates mapping of their field to location
//This way we can call Formik.setErrors(toErrorMap(errors))
export const toErrorMap = (errors: FieldError[]) => {
	const errorMap: Record<string, string> = {};
	errors.forEach(({ field, message }) => {
		errorMap[field] = message;
	});
	return errorMap;
};
