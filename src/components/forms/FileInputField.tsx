import {
	FormControl,
	FormLabel,
	Input,
	FormErrorMessage,
	InputGroup,
	InputLeftElement,
	Icon,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes, useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { FaFile } from "react-icons/fa";
import { ColorConfig } from "../../types/ColorConfig";

type FileInputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
	name: string;
	label: string;
	colorConfig: ColorConfig;
	onlyImage?: boolean;
	singleUpload?: boolean;
};

export const FileInputField: React.FC<FileInputFieldProps> = ({
	label,
	size,
	placeholder,
	colorConfig,
	onlyImage,
	singleUpload,
	...props
}) => {
	const [field, { error }, { setValue }] = useField(props);
	const inputRef = useRef<HTMLInputElement>(null);
	const colorMode = colorConfig.colorMode;
	const [files, setSelectedFiles] = useState<File[]>([]);
	useEffect(() => {
		setValue(files);
	}, [files]);
	const getFileNames = (files: Array<File>) => {
		if (files.length === 0) {
			return;
		}
		const getShortenedFileName = (file: File) => {
			const fileName = file.name;
			const splitFileName = fileName.split(".");
			return `${
				fileName.slice(0, 8) +
				"..." +
				splitFileName[0].slice(-3) +
				"." +
				splitFileName[1]
			} `;
		};
		if (files.length === 1) {
			return getShortenedFileName(files[0]);
		}
		return files.reduce((fileNames, file) => {
			return fileNames + getShortenedFileName(file) + ", ";
		}, "");
	};
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
					accept={onlyImage ? "image/*" : undefined}
					ref={inputRef}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
						if (singleUpload && files.length > 0) {
							return;
						}
						setSelectedFiles([...files, e.target.files![0]]);
						console.log(files);
					}}
					style={{ display: "none" }}
					multiple={true}
				/>
				<Input
					w={{ base: undefined, sm: undefined, md: size }}
					onClick={() => {
						if (singleUpload && files.length > 0) {
							return;
						}
						inputRef.current!.click();
					}}
					value={getFileNames(files) || ""}
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
