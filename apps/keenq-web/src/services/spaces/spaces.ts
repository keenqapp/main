import { S3 } from '@aws-sdk/client-s3'

import { IImage } from '@/model/other'

import { resize } from '@/utils/resize'


const spaces = new S3({
	forcePathStyle: false, // Configures to use subdomain/virtual calling format.
	endpoint: import.meta.env.VITE_SPACES_ENDPOINT,
	region: 'fra1',
	credentials: {
		accessKeyId: import.meta.env.VITE_SPACES_ACCESS_KEY,
		secretAccessKey: import.meta.env.VITE_SPACES_SECRET_KEY,
	}
})

export default spaces

export async function uploadImage(where: string, file: File, authorId?: string): Promise<IImage|undefined> {
	try {
		const resized = await resize(file, { maxHeight: 1000, maxWidth: 1000, prepare: true })
		const fullUrl = `https://cdn.keenq.app/images/${where}/${resized.id}.webp`
		const params = {
			Key: `images/${where}/${resized.id}.webp`,
			Body: resized.data,
			Bucket:  import.meta.env.VITE_SPACES_BUCKET,
			ACL: 'public-read-write',
			ContentType: 'image/webp',
			Metadata: {
				'Cache-Control': 'max-age=2628000, public',
				'Last-Modified': new Date().toUTCString(),
				'Author-Id': authorId || ''
			}
		} as const
		await spaces.putObject(params)
		return {
			id: resized.id,
			url: fullUrl,
			width: resized.width,
			height: resized.height,
			date: new Date().toISOString(),
			authorId
		}
	}
	catch(e) {
		console.log('--- spaces.ts:37 -> uploadImage ->', e)
	}
}

export async function deleteImage(where: string, name: string) {
	try {
		spaces.deleteObject({
			Bucket: import.meta.env.VITE_SPACES_BUCKET,
			Key: `images/${where}/${name}.webp`,
		})
	}
	catch(e) {
		console.log('--- spaces.ts:37 -> uploadImage ->', e)
	}
}
