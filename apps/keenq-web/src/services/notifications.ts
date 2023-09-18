import { getMessaging } from 'firebase/messaging'

import { app } from '@/services/firebase'
import { $modals } from '@/services/modals'

import icon from '@/assets/keenq.svg'


export const messaging = getMessaging(app)

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

