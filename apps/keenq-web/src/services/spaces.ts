import { S3 } from '@aws-sdk/client-s3'

import { IImage } from '@/model/other'
import { resize } from '@/utils/resize'


function random(min: number, max: number) {
	return Math.random() * (max - min) + min
}

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

export async function uploadImage(where: string, file: File): Promise<IImage|undefined> {
	try {
		const resized = await resize(file, { maxHeight: 500, maxWidth: 500 })
		const name = random(1, 100).toFixed(0) + '' + Date.now()
		const fullUrl = `https://keenq.fra1.cdn.digitaloceanspaces.com/images/${where}/${name}.webp`
		const params = {
			Key: `images/${where}/${name}.webp`,
			Body: resized,
			Bucket:  import.meta.env.VITE_SPACES_BUCKET,
			ACL: 'public-read',
			ContentType: 'image/webp',
			Metadata: {
				'Last-Modified': new Date().toUTCString()
			}
		}
		spaces.putObject(params)
		return {
			id: resized.id,
			name: name,
			url: fullUrl,
			width: resized.width,
			height: resized.height
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
