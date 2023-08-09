import { persistentAtom } from '@nanostores/persistent'
import { atom } from 'nanostores'

import { boolAtom } from '@/utils/utils'


export const $pwa = atom(undefined)

export function setPWA(e: any) {
	$pwa.set(e)
}

export const $shouldShow = persistentAtom('shouldShow-pwa-install', true, boolAtom)
