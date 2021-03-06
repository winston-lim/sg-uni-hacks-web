export const defaultEditorData = {
	time: 1626604005156,
	blocks: [
		{
			type: "header",
			data: { text: "Press 'Clear' to start", level: 1 },
		},
		{
			type: "header",
			data: { text: "Important notes on using editor", level: 2 },
		},
		{
			type: "list",
			data: {
				style: "ordered",
				items: [
					"Press Tab to view block options",
					"After creating a block, click anywhere in the block to to show the tuning menu button",
					"You can press the tuning menu button to configure options for a block",
					"Alternatively, pressing tab will open the tuning menu",
					"To escape from a List(bullet or numbered) simply press the right arrow key",
				],
			},
		},
		{ type: "header", data: { text: "Tips", level: 2 } },
		{
			type: "list",
			data: {
				style: "unordered",
				items: [
					"To create a bullet list, first create a numbered l… tuning menu to convert the list to a bullet list",
					"To decorate Text(currently only works on plain tex…ext to show options(bold, italic, marker or link)",
				],
			},
		},
		{
			type: "paragraph",
			data: {
				text: 'Example of <b>bolded</b>,<i> italicised</i>, <mark class="cdx-marker">highlighted&nbsp;</mark>',
			},
		},
	],
	version: "2.22.1",
};
