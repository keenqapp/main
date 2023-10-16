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
		application_name: 'keenq-functions_push_msg',
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

async function getRoom(roomId, db) {
	return (await db.table('rooms').select().where('id', roomId).first())
}

async function getMembers(roomId, db) {
	const ids = (await db.table('rooms_members').select().where('roomId', roomId)).map(roomMember => roomMember.memberId)
	return (await db.table('members').select().whereIn('id', ids).whereNotNull('sub'))
}

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
		topic: room.id,
		url: `https://keenq.app/rooms/${room.id}`
	}
}

async function push(room, members, msg, provider) {
	try {
		const data = getData(members, room, msg)
		const list = members.filter(member => member.id !== msg.authorId)
		for (const member of list) {
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

		db = getDb(config)
		const provider = getProvider()

		const room = await getRoom(msg.roomId, db)
		const members = await getMembers(msg.roomId, db)

		await push(room, members, msg, provider)

		return success(true)
	}
	catch(e) {
		return error(e)
	}
	finally {
		db?.destroy()
	}
}
