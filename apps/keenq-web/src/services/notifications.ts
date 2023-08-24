import { modalsStore } from '@/services/modals'


export async function request() {
	await Notification.requestPermission()
}

export function check() {
	return Notification.permission
}

export function notify() {
	if (check() !== 'granted') modalsStore()['notifications'](true)
}
