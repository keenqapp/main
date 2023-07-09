// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import md5 from 'md5'


export interface ResizeOptions {
	maxWidth?: number
	maxHeight?: number
	format?: 'jpeg' | 'png' | 'webp' | 'bmp',
	quality?: number,
	output?: 'dataURL' | 'File' | 'Blob'
	prepare?: boolean
}

export interface ResizeResult {
	id: string
	width: number
	height: number
	file: File
	date: string
	data: string | File
}

export type Return<O> = O extends { prepare: true }
	? ResizeResult
	: O extends { output: 'dataURL' }
		? string
		: O extends { output: 'File' }
			? File
			: Blob

async function toBlob(canvas: HTMLCanvasElement, type: string, quality: number): Promise<Blob> {
	return new Promise((resolve) => {
		canvas.toBlob(resolve, type, quality)
	})
}

export function resize<O extends ResizeOptions>(file: File, options: O): Promise<Return<O>> {
	const {
		maxWidth = 1024,
		maxHeight = 768,
		format = 'webp',
		quality = 1.0,
		output = 'File',
		prepare = false
	} = options

	const image = new Image()
	const url = typeof file === 'string' ? file : URL.createObjectURL(file)

	return new Promise((resolve, reject) => {
		image.onload = async () => {
			const canvas = document.createElement('canvas')
			const ctx = canvas.getContext('2d')

			if (!ctx) return reject('Error')

			let width = image.width
			let height = image.height

			if (width > height) {
				if (width > maxWidth) {
					height *= maxWidth / width
					width = maxWidth
				}
			} else {
				if (height > maxHeight) {
					width *= maxHeight / height
					height = maxHeight
				}
			}

			canvas.width = width
			canvas.height = height

			ctx.drawImage(image, 0, 0, width, height)

			if (output === 'dataURL') {
				const dataURL = canvas.toDataURL(`image/${format}`, quality)
				if (prepare) {
					const id = md5(dataURL)
					const result = {
						id,
						width,
						height,
						file,
						data: dataURL,
						date: new Date().toISOString()
					}
					resolve(result)
				}
				else resolve(dataURL)
			}

			if (output === 'Blob') {
				const blob = await toBlob(canvas, `image/${format}`, quality)
				resolve(blob)
			}

			if (output === 'File') {
				const blob = await toBlob(canvas, `image/${format}`, quality)
				if (!blob) return reject('Error')

				if (prepare) {
					const arrayBuffer = await blob.arrayBuffer()
					const bytes = new Uint8Array(arrayBuffer)
					const id = md5(bytes)
					const result = {
						id,
						width,
						height,
						file,
						data: new File([blob], file.name, { type: `image/${format}` }),
						date: new Date().toISOString()
					}
					resolve(result)
				}
				else {
					const newfile = new File([blob], file.name, { type: `image/${format}` })
					resolve(newfile)
				}
			}
		}
		image.src = url
	})
}
