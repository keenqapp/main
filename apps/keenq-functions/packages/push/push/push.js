import { object, string } from 'yup'
import webpush from 'web-push'

import { getDb, success, error, validate } from './shared.js'


const schema = object({
	memberId: string().required(),
	title: string().required(),
	body: string().required(),
	topic: string().required(),
	type: string().required(),
	url: string(),
})

const config = {
	client: 'pg',
	connection: {
		connectionString: process.env.DB_CONNECTION_STRING,
		application_name: 'keenq-functions_push_any',
		ssl: { rejectUnauthorized: false },

	},
	pool: { min: 0, max: 2 }
}

const vapidPublicKey = process.env.VAPID_PUBLIC_KEY
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY

function getProvider() {
	webpush.setVapidDetails('https://keenq.app', vapidPublicKey, vapidPrivateKey)
	return webpush.sendNotification
}

async function getMember(id, db) {
	const member = await db.table('members').select().where('id', id).whereNotNull('sub').first()
	if (!member) throw { error: 'error.memberNotFound' }
	return member
}

function getData(title, body, topic, url = 'https://keenq.app/') {
	return {
		body,
		title,
		topic,
		url
	}
}

async function push({ member, title, body, topic, type, url, provider }) {
	const data = getData(title, body, topic, url)
	await provider(member.sub, JSON.stringify({ type, data }), { topic })
}

export async function main(data) {
	let db
	try {
		const { memberId, title, body, topic, type, url } = validate(data, schema)

		db = getDb(config)
		const provider = getProvider()

		const member = await getMember(memberId, db)
		await push({ member, title, body, topic, type, url, provider })

		return success(true)
	}
	catch(e) {
		return error(e)
	}
	finally {
		db?.destroy()
	}
}
