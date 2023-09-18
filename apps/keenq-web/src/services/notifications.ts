import { getMessaging, getToken, isSupported } from 'firebase/messaging'

import { app } from '@/services/firebase'
import { $modals } from '@/services/modals'

import { updatemembergql, useCurrentMember } from '@/model/member'

import icon from '@/assets/keenq.svg'
import { useMutation } from '@/hooks/gql'
import useAsyncEffect from '@/hooks/useAsyncEffect'


const vapidKey = import.meta.env.VITE_VAPID_KEY

export let messaging: any
async function init() {
	try {
		const supported = await isSupported()
		if (supported) messaging = getMessaging(app)
	}
	catch(e) {
		throw { error: e }
	}
}
init()

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
		if (id && messaging) {
			try {
				const pushToken = await getToken(messaging, { vapidKey })
				await update({ id, data: { pushToken } })
			}
			catch(e) {
				throw { error: e }
			}
		}
	}, [ id, messaging ])
}

export function useNotifications() {
	return {
		request,
		check,
		notify,
	}
}

// const options = {
// 	userVisibleOnly: true,
// 	applicationServerKey: import.meta.env.VITE_PUSH_KEY,
// }

// async function register() {
// 	try {
// 		const sw  = await navigator.serviceWorker.ready
// 		const sub = await sw.pushManager.subscribe(options)
// 		// console.log('--- notifications.ts:45 -> register ->', sub)
// 	}
// 	catch(e) {
// 		console.log('--- notifications.ts:41 -> register -> error', e)
// 	}
// }
//
// register()

// try {
// 	navigator.serviceWorker.ready.then(async registration => {
// 		console.log('--- notifications.ts:38 ->  ->', Notification.permission)
// 		console.log('--- notifications.ts:38 ->  ->', registration.pushManager)
// 		const p = await registration.pushManager.permissionState()
// 		console.log('--- notifications.ts:38 ->  ->', p)
// 	})
// }
// catch(e) {
// 	console.log('--- notifications.ts:43 ->  ->', e)
// }

