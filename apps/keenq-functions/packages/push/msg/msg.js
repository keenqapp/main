import { object, mixed } from 'yup'
import webpush from 'web-push'

import { getDb, getCreds, ensureCreds, success, error, validate } from './shared.js'


const schema = object({
	event: mixed().required(),
})

const config = {
	client: 'pg',
	connection: {
		connectionString: process.env.DB_CONNECTION_STRING,
		ssl: { rejectUnauthorized: false },
	},
	pool: { min: 0, max: 2 }
}

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY

function getPushes() {
	webpush.setVapidDetails('https://keenq.app', vapidPublicKey, vapidPrivateKey)
	return webpush.sendNotification
}

async function getMember(id, db) {
	return db.table('members').select().where('id', id).first()
}

async function getMembers(id, db) {
	return db.table('rooms_members').select().where('roomId', id)
}

async function msg(payload, sub, provider) {
	try {
		provider(sub, JSON.stringify(payload))
	}
	catch(e) {
		console.log('--- send.js:38 -> send ->', e)
		throw { error: e }
	}
}

export async function main(body) {
	let db
	try {
		const { event } = validate(body, schema)
		const { roomId } = event.data.new

		db = getDb(config)

		const members = await getMembers(roomId, db)

		// await msg(sub, pushes)

		return success({ members })
	}
	catch(e) {
		console.log('--- send.js:65 -> main ->', e)
		return error(e)
	}
	finally {
		db?.destroy()
	}
}

const body = { id: 'boris', payload: { title: 'title', body: 'body' } }

main(body)
