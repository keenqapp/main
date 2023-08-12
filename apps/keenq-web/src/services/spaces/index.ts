async function uploadImage(where: string, file: File, authorId?: string) {
	const module = await import('./spaces')
	return module.uploadImage(where, file, authorId)
}

async function deleteImage(where: string, name: string) {
	const module = await import('./spaces')
	return module.deleteImage(where, name)
}

export {
	deleteImage,
	uploadImage
}
