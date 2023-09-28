import { object, string, mixed } from 'yup'
import webpush from 'web-push'

import { getDb, getCreds, ensureCreds, success, error, validate } from './shared.js'


const schema = object({
	id: string().required(),
	payload: mixed()
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

async function send(payload, sub, provider) {
	provider(sub, payload)
}

export async function main(body) {
	let db
	try {
		const { id, payload } = validate(body, schema)

		db = getDb(config)

		const creds = await getCreds(id, db)
		await ensureCreds(creds)

		const { sub } = await getMember(id, db)

		const pushes = getPushes()
		await send(payload, sub, pushes)

		return success({ sub, payload })
	}
	catch(e) {
		return error(e)
	}
	finally {
		db?.destroy()
	}
}
