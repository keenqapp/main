importScripts(
	'https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js'
)


const publicKey = 'BLcppKuyf4h6nMpnYzmfebRvs8WvVwM6PV_G13Bg00Hpau02gPri2PYNsXYp5Ld4TNlmThHy-omjIy1kWI3Sbos'
const icon = 'https://cdn.keenq.app/assets/images/keenq_padding.png'

const options = {
	userVisibleOnly: true,
	applicationServerKey: urlBase64ToUint8Array(publicKey),
}

async function subscribe() {
	let sub = await self.registration.pushManager.getSubscription()
	if (!sub) sub = await self.registration.pushManager.subscribe(options)
	postMessage({ type: 'sub', data: sub.toJSON() })
}

async function postMessage(msg) {
	await self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(clients => {
		clients.forEach(client => {
			client.postMessage(msg)
		})
	})
}

let granted = false
let topics = new Set()
let online = false

async function check() {
	const pushState = await self.registration.pushManager.permissionState(options)
	const notifyState = Notification.permission
	const result = pushState === 'granted' && notifyState === 'granted'
	granted = result
	return result
}

async function request() {
	const perm = await Notification.requestPermission()
	if (perm === 'granted') {
		await subscribe()
	}
}

function spawn({ title, body }) {
	const options = {
		icon,
		body,
	}
	new Notification(title, options)
}

self.addEventListener('widgetinstall', (event) => {
	event.waitUntil(updateWidget(event))
})

self.addEventListener('widgetresume', (event) => {
	event.waitUntil(updateWidget(event))
})

self.addEventListener('widgetclick', (event) => {
	if (event.action == 'updateName') {
		event.waitUntil(updateName(event))
	}
})

self.addEventListener('widgetuninstall', (event) => {})

self.addEventListener('message', async (event) => {
	const granted = await check()
	const payload = event.data.data || {}
	if (event.data.type === 'sub') {
		if (!granted) await request()
		await subscribe()
	}
	else if (event.data.type === 'topics') {
		topics = new Set(payload)
	}
	else if (event.data.type === 'online') {
		online = payload
	}
	else if (event.data.type === 'msg') {
		event.waitUntil(
			self.registration.showNotification(payload.title || 'keenq', {
				icon,
				body: payload.body,
			})
		)
	}
})

function getPayload(event) {
	const payload = event.data?.json()
	if (payload.type === 'roomMsg') return {
		title: payload.data.title,
		body: payload.data.body,
		topic: payload.data.topic,
		url: payload.data.url,
	}
	return {
		title: payload?.data.title || 'keenq',
		body: payload?.data.body || 'newmsg',
		topic: payload.data.topic,
		url: payload.data.url,
	}
}

self.addEventListener('push', async function(event) {
	const { title, body, topic } = getPayload(event)
	const isVisible = (await self.clients.matchAll({ includeUncontrolled: true, type: 'window' })).some(c => c.visibilityState === 'visible')
	if (topics.has(topic) || isVisible) return
	event.waitUntil(
		self.registration.showNotification(title, {
			icon,
			body,
		})
	)
})

const updateWidget = async (event) => {
	const widgetDefinition = event.widget.definition
	const payload = {
		template: JSON.stringify(await (await fetch(widgetDefinition.msAcTemplate)).json()),
		data: JSON.stringify(await (await fetch(widgetDefinition.data)).json()),
	}
	await self.widgets.updateByInstanceId(event.instanceId, payload)
}

const updateName = async (event) => {
	const name = event.data.json().name
	const widgetDefinition = event.widget.definition
	const payload = {
		template: JSON.stringify(await (await fetch(widgetDefinition.msAcTemplate)).json()),
		data: JSON.stringify({ name }),
	}
	await self.widgets.updateByInstanceId(event.instanceId, payload)
}

function urlBase64ToUint8Array(base64String) {
	var padding = '='.repeat((4 - base64String.length % 4) % 4)
	var base64 = (base64String + padding)
		.replace(/\-/g, '+')
		.replace(/_/g, '/')

	var rawData = atob(base64)
	var outputArray = new Uint8Array(rawData.length)

	for (var i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i)
	}
	return outputArray
}

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || [])
