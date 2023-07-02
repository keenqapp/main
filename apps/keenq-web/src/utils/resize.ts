// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import md5 from 'md5'


export interface Options {
	maxWidth?: number
	maxHeight?: number
	format?: 'jpeg' | 'png' | 'webp' | 'bmp',
	quality?: number,
	output?: 'dataURL' | 'File' | 'Blob'
}

function toArrayBuffer(blob: Blob, cb: any): ArrayBuffer {
	blob
		.arrayBuffer()
		.then((buffer: ArrayBuffer) => cb(buffer))
}

export function resize(file: File, options: Options): Promise<any> {
	const {
		maxWidth = 1024,
		maxHeight = 768,
		format = 'webp',
		quality = 1.0,
		output = 'File'
	} = options

	const image = new Image()
	const url = typeof file === 'string' ? file : URL.createObjectURL(file)

	return new Promise((resolve, reject) => {
		image.onload = () => {
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
				resolve(dataURL)
			}

			if (output === 'Blob') {
				canvas.toBlob(blob => resolve(blob), `image/${format}`, quality)
			}

			if (output === 'File') {
				canvas.toBlob(blob => {
					if (!blob) return reject('Error')

					toArrayBuffer(blob, (buffer: ArrayBuffer) => {
						const bytes = new Uint8Array(buffer)
						const hash = md5(bytes)
						const newFile = new File([blob], file.name, { type: `image/${format}` })
						newFile.uid = hash
						newFile.width = width
						newFile.height = height
						resolve(newFile)
					})
				}, `image/${format}`, quality)
			}
		}
		image.src = url
	})
}
