let loaded: any

async function load() {
	if (loaded) return loaded
	loaded = await import('./spaces')
	return loaded
}

async function uploadImage(where: string, file: File, authorId?: string) {
	const module = await load()
	return module.uploadImage(where, file, authorId)
}

async function deleteImage(where: string, name: string) {
	const module = await load()
	return module.deleteImage(where, name)
}

export {
	deleteImage,
	uploadImage
}
