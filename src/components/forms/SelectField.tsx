import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Textarea,
	useColorMode,
	Select,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { Category, ColorConfig } from "../../types/default";

type SelectFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
	colorConfig: ColorConfig;
	size?: number;
};

export const SelectField: React.FC<SelectFieldProps> = ({
	label,
	size,
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
			<Select
				w={{ base: undefined, sm: undefined, md: size }}
				{...inputProps}
				variant="filled"
				bgColor={colorConfig.bgColor[colorMode]}
				color={colorConfig.color[colorMode]}
				colorScheme={colorConfig.colorScheme[colorMode]}
			>
				<option value={Category.GENERAL}>General</option>
				<option value={Category.NOTE_TAKING}>Notetaking</option>
				<option value={Category.TIME_SAVER}>Time savers</option>
				<option value={Category.PLANNING}>Planning</option>
				<option value={Category.TIME_MANAGEMENT}>Time management</option>
				<option value={Category.EDUCATION}>Education</option>
				<option value={Category.UNIVERSITY}>University</option>
				<option value={Category.TECHNOLOGY}>Technology</option>
				<option value={Category.FINANCE}>Finance</option>
				<option value={Category.FASHION}>Fashion</option>
				<option value={Category.OTHERS}>Others</option>
			</Select>
			{error ? (
				<FormErrorMessage colorScheme={colorConfig.errorColor![colorMode]}>
					{error}
				</FormErrorMessage>
			) : null}
		</FormControl>
	);
};
