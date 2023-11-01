import { object, mixed } from 'yup'
import webpush from 'web-push'

import { success, error, validate } from '../../shared.js'


const schema = object({
	msg: mixed().required(),
})

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
	return db.table('members').select().whereIn('id', ids)
}

function getTitle(room, author) {
	if (room.type === 'personal') return author?.name
	if (room.type === 'private') return `${room.name}: ${author?.name}`
	if (room.type === 'public') return `${room.name}: ${author?.name}`
	if (room.type === 'channel') return room.name
}

function getData(members, room, msg) {
	const author = members.find(member => member.id === msg.authorId)
	const text = msg.content.find(item => item.type === 'text')?.value.text || 'notext'
	const img = msg.content.some(item => item.type === 'image')
	const body = `${img ? '📷 ' : ''}${text || ''}`
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

export default async function msg(body, db) {
	try {
		const { msg } = validate(body, schema)
		if (msg.type !== 'personal') return error({ reason: 'msg is not personal' })

		const provider = getProvider()

		const room = await getRoom(msg.roomId, db)
		const members = await getMembers(msg.roomId, db)

		await push(room, members, msg, provider)

		return success(true)
	}
	catch(e) {
		return error(e)
	}
}
