import { $modals } from '@/services/modals'

import { updatemembergql, useCurrentMember } from '@/model/member'

import icon from '@/assets/keenq.svg'
import { useMutation } from '@/hooks/gql'
import useAsyncEffect from '@/hooks/useAsyncEffect'


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

	useAsyncEffect(async () => {
		if (id) {
			try {
				const registration = await navigator.serviceWorker.ready
				const state = await registration.pushManager.permissionState(options)
				if (state !== 'granted') return
				const sub = await registration.pushManager.subscribe(options)
				await update({ id, data: { push: sub.endpoint } })
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
