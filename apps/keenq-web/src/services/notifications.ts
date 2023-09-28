import { $modals } from '@/services/modals'

import { updatemembergql, useCurrentMember } from '@/model/member'

import icon from '@/assets/keenq.svg'
import { useMutation } from '@/hooks/gql'
import useAsyncEffect from '@/hooks/useAsyncEffect'


export interface ISub {
	type: 'sub'
	data: any
}

export interface IMsg {
	type: 'msg'
	data: any
}

export type IPush = ISub | IMsg

export let messaging: any

const options = {
	userVisibleOnly: true,
	applicationServerKey: import.meta.env.VITE_VAPID_KEY,
}

export async function request() {
	await Notification.requestPermission()
}

export function check() {
	return Notification.permission
}

export function spawn(body: string) {
	const options = {
		icon,
		body,
	}
	new Notification('keenq', options)
}

export function notify(msg: string) {
	if (check() !== 'granted') return $modals.setKey('notifications', true)
	spawn(msg)
}

export function usePushes() {
	const { id } = useCurrentMember()
	const [ , update ] = useMutation(updatemembergql)

	async function onMessage({ data }: IPush) {
		if (data.type === 'sub') {
			await update({ id, data: { sub: data.sub } })
		}
		else if (data.type === 'msg') {
			notify(data.msg)
		}
	}

	useAsyncEffect(async () => {
		if (id) {
			try {
				const registration = await navigator.serviceWorker.ready
				const manager = registration.pushManager
				const state = await manager.permissionState(options)
				if (state !== 'granted') return
				navigator.serviceWorker.addEventListener('message', onMessage)
				return () => {
					navigator.serviceWorker.removeEventListener('message', onMessage)
				}
			}
			catch(e) {
				throw { error: e }
			}
		}
	}, [ id ])
}

export function useNotifications() {
	return {
		request,
		check,
		notify,
	}
}
