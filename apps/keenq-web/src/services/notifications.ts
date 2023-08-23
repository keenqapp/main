export async function useNotifications() {
	const result = await Notification.requestPermission()
	console.log('--- notifications.ts:3 -> useNotifications ->', result)
}
