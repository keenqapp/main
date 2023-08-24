import { modalsStore } from '@/services/modals'


export async function request() {
	await Notification.requestPermission()
}

export function check() {
	return Notification.permission
}

export function notify() {
	console.log('--- notifications.ts:13 -> notify ->', check() !== 'granted')
	if (check() !== 'granted') modalsStore()['notifications'](true)
}
