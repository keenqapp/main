import { persistentAtom } from '@nanostores/persistent'
import { useStore } from '@nanostores/preact'
import { atom } from 'nanostores'

import { $modals } from '@/services/modals'

import { updatemembergql, useCurrentMember } from '@/model/member'

import { useMutation } from '@/hooks/gql'
import useAsyncEffect from '@/hooks/useAsyncEffect'
import { json } from '@/utils/utils'


export interface ISub {
	type: 'sub'
}

export interface ITopics {
	type: 'topics'
	data: string[]
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

export type IPush = ISub | INotification | ICheck | ITopics | { type: string, data: any }

export const $granted = atom(false)
export const $asked = persistentAtom('$asked', false, json)
export const $topics = persistentAtom<string[]>('$topics', [], json)
$topics.subscribe(topics => postMessage({ type: 'topics', data: topics }))

export function useTopic(name: string) {
	const topics = useStore($topics)
	const isSub = !topics.includes(name)

	function toggle() {
		if (isSub) $topics.set([ ...topics, name ])
		else $topics.set(topics.filter(t => t !== name))
	}

	return [ isSub, toggle ] as const
}

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
		$asked.set(true)
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
		if (check()) {
			postMessage({ type: 'sub' })
			postMessage({ type: 'topics', data: $topics.get() })
		}
		navigator.serviceWorker.addEventListener('message', onMessage)
		return () => navigator.serviceWorker.removeEventListener('message', onMessage)
	}, [ id ])
}
