export const categoryToColorMapping = {
	general: "teal.200",
	"note-taking": "blue.300",
	"time-saver": "yellow.400",
	university: "grey",
	education: "purple.200",
	"time-management": "yellow.500",
	health: "green.400",
	planning: "orange.400",
	finance: "brown",
	technology: "blue.500",
	fashion: "pink.300",
	others: "blackAlpha.300",
};

export const mapCategoryToColor = (category: string) => {
	return (categoryToColorMapping as any)[category];
};
