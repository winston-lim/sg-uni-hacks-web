import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	Textarea,
	useColorMode,
	InputGroup,
	InputLeftElement,
	Icon,
	Button,
	useBreakpointValue,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";
import { useState } from "react";
import { useRef } from "react";
import { FaFile } from "react-icons/fa";
import { ColorConfig } from "../../types/default";

type FileInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
	colorConfig: ColorConfig;
};

export const FileInputField: React.FC<FileInputFieldProps> = ({
	label,
	size,
	placeholder,
	colorConfig,
	...props
}) => {
	const [field, { error }, { setValue }] = useField(props);
	const inputRef = useRef<HTMLInputElement>(null);
	const colorMode = colorConfig.colorMode;
	return (
		<FormControl isInvalid={!!error}>
			<FormLabel htmlFor={field.name}>{label}</FormLabel>
			<InputGroup>
				<InputLeftElement
					pointerEvents="none"
					children={<Icon as={FaFile} />}
				/>
				<input
					type="file"
					ref={inputRef}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						e.persist();
						setValue(e.currentTarget.files![0]);
					}}
					style={{ display: "none" }}
				/>
				<Input
					w={{ base: undefined, sm: undefined, md: size }}
					onClick={() => inputRef.current!.click()}
					value={field.value.name || ""}
					placeholder={placeholder}
					bgColor={colorConfig.bgColor[colorMode]}
					colorScheme={colorConfig.colorScheme[colorMode]}
					color={colorConfig.color[colorMode]}
					_placeholder={{ color: colorConfig.color[colorMode] }}
					readOnly
				/>
			</InputGroup>
			{error ? (
				<FormErrorMessage color={colorConfig.errorColor![colorMode]}>
					{error}
				</FormErrorMessage>
			) : null}
		</FormControl>
	);
};
