import { atom } from 'nanostores'

import { IImage } from '@/model/other'

import { resize, ResizeResult } from '@/utils/resize'


export const $imagesToAdd = atom(new Map<string, ResizeResult>())
export const $messageReplyOrEditId = atom<{ mode: string, id: string }>({ mode: '', id: '' })
export const $imagesToEdit = atom<IImage[]>([])
export const $imagesToEditSetted = atom(false)

export const $sending = atom(false)

export const $scroll = atom<HTMLDivElement|null>(null)

export async function prepareImageToUpload(image: File) {
	const result = await resize(image, { maxHeight: 500, maxWidth: 500, output: 'dataURL', prepare: true })
	$imagesToAdd.set($imagesToAdd.get().copyAdd(result.id, result))
}

export function clear() {
	$messageReplyOrEditId.set({ mode: '', id: '' })
	$imagesToEdit.set([])
	$imagesToEditSetted.set(false)
	$imagesToAdd.set(new Map())
}
