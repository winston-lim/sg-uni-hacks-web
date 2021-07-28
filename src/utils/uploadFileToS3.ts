export const uploadFileToS3 = async (file: File, userId: string) => {
	let formData = new FormData();
	formData.append("files", file);
	const response = await fetch(`http://localhost:5001/upload/SUH-${userId}`, {
		method: "POST",
		body: formData,
	});
	return response.json();
};