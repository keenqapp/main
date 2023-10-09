import { object, mixed } from 'yup'
import webpush from 'web-push'

import { getDb, getCreds, ensureCreds, success, error, validate } from './shared.js'


const schema = object({
	msg: mixed().required(),
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

async function getMembers(id, db) {
	const ids = (await db.table('rooms_members').select().where('roomId', id)).map(roomMember => roomMember.memberId)
	return (await db.table('members').select().whereIn('id', ids).whereNotNull('sub')).map(member => member.sub)
}

async function push(subs, msg, provider) {
	try {
		for (const sub of subs) {
			provider(sub, JSON.stringify(msg))
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
		const { roomId } = event

		db = getDb(config)

		const subs = await getMembers(roomId, db)
		const pushes = getPushes()

		await push(subs, msg, pushes)

		return success(true)
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
