import EditorJs from "react-editor-js";
import EditorJS from "@editorjs/editorjs";
const Embed = require("@editorjs/embed");
const Table = require("@editorjs/table");
const List = require("@editorjs/list");
const Warning = require("@editorjs/warning");
const Code = require("@editorjs/code");
const LinkTool = require("@editorjs/link");
const Image = require("@editorjs/simple-image");
const Raw = require("@editorjs/raw");
const Header = require("@editorjs/header");
const Quote = require("@editorjs/quote");
const Marker = require("@editorjs/marker");
const CheckList = require("@editorjs/checklist");

import React from "react";
import { useState } from "react";
import { EditorContainer } from "../layout/EditorContainer";
import { BackgroundProps } from "@chakra-ui/react";
import { useCreateHackMutation } from "../../generated/graphql";
import { NextRouter } from "next/router";
import {
	handleGraphqlError,
	handleGraphqlSuccess,
} from "../../utils/handleGraphqlResponse";
import { defaultEditorData } from "../../constants/defaultEditorData";
import { Category } from "../../types/Category";

const EDITOR_JS_TOOLS = {
	embed: Embed,
	table: Table,
	marker: Marker,
	list: List,
	warning: Warning,
	code: Code,
	linkTool: LinkTool,
	image: Image,
	raw: Raw,
	header: Header,
	quote: Quote,
	checklist: CheckList,
};
export interface EditorProps {
	borderColor: BackgroundProps["bgColor"];
	router: NextRouter;
	setAlert: React.Dispatch<React.SetStateAction<string>>;
}
export const Editor: React.FC<EditorProps> = ({
	router,
	borderColor,
	setAlert,
}) => {
	const [clearCount, setClearCount] = useState<number>(0);
	const [, createHack] = useCreateHackMutation();
	const [isReady, setIsReady] = useState<boolean>(false);
	const instanceRef = React.useRef<EditorJS | null>(null);
	async function handleSave() {
		if (clearCount < 1) {
			setAlert("error: cannot submit unchanged template!");
			return setTimeout(() => {
				setAlert("");
			}, 3000);
		}
		const savedData = await instanceRef.current!.save();
		const JSONData = JSON.stringify(savedData);
		const response = await createHack({
			input: {
				title: "untitled full submission",
				category: Category.GENERAL,
				description: "under review",
				body: JSONData,
			},
		});
		if (response.error) {
			await handleGraphqlError(response, setAlert);
		} else if (response.data?.createHack) {
			await handleGraphqlSuccess(
				setAlert,
				"sucessfully created a full submission"
			);
			router.push("/my-submissions");
		}
		return;
	}
	async function handleClear() {
		await instanceRef.current!.clear();
		setClearCount(clearCount + 1);
	}
	return (
		<>
			<EditorJs
				tools={EDITOR_JS_TOOLS}
				onReady={(instance?: EditorJS) => {
					instance?.isReady.then(() => setIsReady(true));
				}}
				holder="editorContainer"
				instanceRef={(instance) => (instanceRef.current = instance)}
				data={defaultEditorData}
			>
				<EditorContainer
					isReady={isReady}
					textColor="black"
					bgColor="white"
					borderColor={borderColor}
					handleSave={handleSave}
					handleClear={handleClear}
				/>
			</EditorJs>
		</>
	);
};

export default Editor;
