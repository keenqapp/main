import { persistentAtom } from '@nanostores/persistent'
import { atom } from 'nanostores'

import { $modals } from '@/services/modals'

import { updatemembergql, useCurrentMember } from '@/model/member'

import { useMutation } from '@/hooks/gql'
import useAsyncEffect from '@/hooks/useAsyncEffect'
import { boolAtom } from '@/utils/utils'


export interface ISub {
	type: 'sub'
}

export interface INotification {
	type: 'msg'
	data: {
		title?: string
		body: string
	}
}

export interface ICheck {
	type: 'check'
	data: any
}

export type IPush = ISub | INotification | ICheck

export const $granted = atom(false)
export const $asked = persistentAtom('$asked', false, boolAtom)

export function postMessage(data: IPush) {
	navigator.serviceWorker.ready.then(registration => {
		registration.active?.postMessage(data)
	})
}

export function notify(data: INotification['data']) {
	postMessage({ type: 'msg', data })
}

let counter = 0

export function ask() {
	if (!$asked.get() || (!$granted.get() && counter > 100)) {
		$modals.setKey('notifications', true)
		counter = 0
	}
	else counter++
}

export async function request() {
	const perm = await Notification.requestPermission()
	if (perm === 'granted') {
		$granted.set(true)
		postMessage({ type: 'sub' })
	}
	return perm
}

function check() {
	const perm = Notification.permission === 'granted'
	$granted.set(perm)
	return perm
}

export function usePushes() {
	const { id } = useCurrentMember()
	const [ , update ] = useMutation(updatemembergql)

	async function onMessage({ data }: any) {
		if (data.type === 'sub') {
			await update({ id, data: { sub: data.data } })
		}
	}

	useAsyncEffect(async () => {
		if (!id) return
		if (check()) postMessage({ type: 'sub' })
		navigator.serviceWorker.addEventListener('message', onMessage)
		return () => navigator.serviceWorker.removeEventListener('message', onMessage)
	}, [ id ])
}
