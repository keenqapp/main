importScripts(
	'https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js'
)

// This is your Service Worker, you can put any of your custom Service Worker
// code in this file, above the `precacheAndRoute` line.

// When widget is installed/pinned, push initial state.
self.addEventListener('widgetinstall', (event) => {
	event.waitUntil(updateWidget(event))
})

// When widget is shown, update content to ensure it is up-to-date.
self.addEventListener('widgetresume', (event) => {
	event.waitUntil(updateWidget(event))
})

// When the user clicks an element with an associated Action.Execute,
// handle according to the 'verb' in event.action.
self.addEventListener('widgetclick', (event) => {
	if (event.action == 'updateName') {
		event.waitUntil(updateName(event))
	}
})

// When the widget is uninstalled/unpinned, clean up any unnecessary
// periodic sync or widget-related state.
self.addEventListener('widgetuninstall', (event) => {})

self.addEventListener('activate', async (event) => {
	await subscribe()
})

self.addEventListener('push', (event) => {
	console.log('--- sw.js:100 ->  ->', event)
})

const updateWidget = async (event) => {
// The widget definition represents the fields specified in the manifest.
	const widgetDefinition = event.widget.definition

	// Fetch the template and data defined in the manifest to generate the payload.
	const payload = {
		template: JSON.stringify(await (await fetch(widgetDefinition.msAcTemplate)).json()),
		data: JSON.stringify(await (await fetch(widgetDefinition.data)).json()),
	}

	// Push payload to widget.
	await self.widgets.updateByInstanceId(event.instanceId, payload)
}

const updateName = async (event) => {
	const name = event.data.json().name

	// The widget definition represents the fields specified in the manifest.
	const widgetDefinition = event.widget.definition

	// Fetch the template and data defined in the manifest to generate the payload.
	const payload = {
		template: JSON.stringify(await (await fetch(widgetDefinition.msAcTemplate)).json()),
		data: JSON.stringify({ name }),
	}

	// Push payload to widget.
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

async function notifications() {
	console.log('--- sw.js:61 -> notifications ->', Notification.permission)
}

const publicKey = 'BLcppKuyf4h6nMpnYzmfebRvs8WvVwM6PV_G13Bg00Hpau02gPri2PYNsXYp5Ld4TNlmThHy-omjIy1kWI3Sbos'

const options = {
	userVisibleOnly: true,
	applicationServerKey: urlBase64ToUint8Array(publicKey),
}

async function subscribe() {
	const sub = await self.registration.pushManager.subscribe(options)
	console.log('--- sw.js:88 -> subscribe ->', sub)
	await self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(clients => {
		clients.forEach(client => {
			client.postMessage(sub.toJSON())
		})
	})
}
async function init() {
	const r = await subscribe()
}

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || [])
