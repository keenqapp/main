import { object, string, mixed } from 'yup'
import webpush from 'web-push'

import { getDb, getCreds, ensureCreds, success, error, validate } from './shared.js'


const schema = object({
	msg: mixed().required()
})

const config = {
	client: 'pg',
	connection: {
		connectionString: process.env.DB_CONNECTION_STRING,
		ssl: { rejectUnauthorized: false },
	},
	pool: { min: 0, max: 2 }
}

const pubk = 'BLcppKuyf4h6nMpnYzmfebRvs8WvVwM6PV_G13Bg00Hpau02gPri2PYNsXYp5Ld4TNlmThHy-omjIy1kWI3Sbos'
const prk = 'dtf2-vLHRXG8f7YDaM1XhQkdBqi6uIbAfggBQyLC2D0'

// const vapidPublicKey = process.env.VAPID_PUBLIC_KEY
// const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY
const vapidPublicKey = pubk
const vapidPrivateKey = prk

function getPushes() {
	webpush.setVapidDetails('https://keenq.app', vapidPublicKey, vapidPrivateKey)
	return webpush.sendNotification
}

async function getMember(id, db) {
	return db.table('members').select().where('id', id).first()
}

// async function send(payload, sub, provider) {
// 	try {
// 		provider(sub, JSON.stringify(payload))
// 	}
// 	catch(e) {
// 		throw { error: e }
// 	}
// }

const sub = {"keys": {"auth": "9TaCqa_2HnWL5DI9fE98yg", "p256dh": "BNjXNa0HgTQ8_b2oGfTrusId2ngbeVunQ8VIrr1p7YHFfw3o58go2k-WYD4ThIn5JS1WL1zMCTwGSoQyBQTbItM"}, "endpoint": "https://fcm.googleapis.com/fcm/send/fy6kdzgQRxw:APA91bEmy1EdkITUupUhZeC1s1l45YZ9Ye1AzV72hY1ciN_EBQf8lkCl1anrpEcHm58u-uvheSurRGOMyPlNiEwWbyg_z7sC2YUBEpuzXV5ct2E-lsULXnLGH30rGCRoorU6p0BzVsJk", "expirationTime": null}
const room = { id: 'keenq', name: 'keenq', type: 'public' }
const members = [{ id: 'boris', name: 'boris', sub: sub }]

function getTitle(room, author) {
	if (room.type === 'personal') return author?.name
	if (room.type === 'private') return `${room.name}: ${author?.name}`
	if (room.type === 'public') return `${room.name}: ${author?.name}`
	if (room.type === 'channel') return room.name
}

function getData(members, room, msg) {
	const author = members.find(member => member.id === msg.authorId)
	const body = msg.content.find(item => item.type === 'text')?.value.text || 'notext'
	const title = getTitle(room, author)
	return {
		body,
		title,
		url: 'some_url'
	}
}

async function push(room, members, msg, provider) {
	try {
		const data = getData(members, room, msg)
		for (const member of members) {
			provider(member.sub, JSON.stringify({ type: 'roomMsg', data }), { topic: room.id })
		}
	}
	catch(e) {
		throw { error: e }
	}
}

export async function main(body) {
	let db
	try {
		const { msg } = validate(body, schema)

		// db = getDb(config)

		// const creds = await getCreds(id, db)
		// await ensureCreds(creds)

		// const { sub } = await getMember(id, db)



		const pushes = getPushes()
		await push(room, members, msg, pushes)

		return success(true)
	}
	catch(e) {
		console.log('--- send.js:102 -> main ->', e)
		return error(e)
	}
	finally {
		db?.destroy()
	}
}

const body = {
	"msg": {
		"id": "id",
		"date": "2023-10-09T14:11:28.491Z",
		"content": [{ "type": "text", "value": { "text": "some text" }}],
		"reactions": "reactions",
		"reactionsCount": "reactionsCount",
		"createdAt": "2023-10-09T14:11:28.491Z",
		"updatedAt": "2023-10-09T14:11:28.491Z",
		"authorId": "boris",
		"roomId": "keenq",
		"type": "type"
	}
}

main(body)
