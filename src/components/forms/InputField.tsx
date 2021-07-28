import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Textarea,
	useColorMode,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { ColorConfig } from "../../types/default";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
	colorConfig: ColorConfig;
	textarea?: boolean;
};

export const InputField: React.FC<InputFieldProps> = ({
	label,
	size,
	textarea,
	colorConfig,
	...props
}) => {
	const [field, { error }] = useField(props);
	const inputProps = {
		...field,
		...props,
		id: field.name,
		placeholder: props.placeholder,
	} as any;
	const colorMode = colorConfig.colorMode;
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			{textarea ? (
				<Textarea {...inputProps}></Textarea>
			) : (
				<Input
					w={{ base: undefined, sm: undefined, md: size }}
					{...inputProps}
					variant="filled"
				/>
			)}
			{error ? (
				<FormErrorMessage color={colorConfig.errorColor![colorMode]}>
					{error}
				</FormErrorMessage>
			) : null}
		</FormControl>
	);
};
