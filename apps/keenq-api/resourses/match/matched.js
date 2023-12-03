import { object, string,  } from 'yup'
import { generate } from 'random-words'
import axios from 'axios'

import { ensureCreds, success, error, getId, validate, getCreds, transaction, getDb } from '../../shared.js'


const schema = object({
	authorId: string().required(),
	memberId: string().required(),
	type: string().oneOf(['yes', 'no']).required(),
})

function getPushProvider() {
	return {
		send: (data) => axios.post('https://fns.keenq.app/push/push', data)
	}
}

async function check(authorId, memberId, type, db, trx) {
	if (type === 'no') throw { reason: 'This is "no" match' }

	const first = await db
		.table('matches')
		.transacting(trx)
		.select()
		.where('authorId', authorId)
		.where('memberId', memberId)
		.where('type', 'yes')
		.first()

	const second = await db
		.table('matches')
		.transacting(trx)
		.select()
		.where('authorId', memberId)
		.where('memberId', authorId)
		.where('type', 'yes')
		.first()

	if (!first || !second) throw {
		reason: 'Not full match',
		match: `From: ${authorId} || To: ${memberId} || Type: ${type}`,
		details: {
			first: first || null,
			second: second || null,
		}
	}

	return [first, second]
}

async function getRoom(authorId, memberId, db, trx) {
	try {
		const id = getId()
		const name = generate({ exactly: 3, join: '-' })
		const room = await db
			.table('rooms')
			.transacting(trx)
			.returning('*')
			.insert({ id, name, type: 'personal' })
		return room[0]
	}
	catch(e) {
		throw { error: e }
	}
}

async function add(authorId, memberId, room, db, trx) {
	const roomId = room.id
	try {
		await db
			.table('rooms_members')
			.transacting(trx)
			.insert([
				{ roomId, memberId: authorId, privateFor: memberId },
				{ roomId, memberId: memberId, privateFor: authorId },
			])
	}
	catch(e) {
		throw { error: e, reason: { roomId } }
	}
}

async function hi(room, db, trx) {
	await db
		.table('messages')
		.transacting(trx)
		.insert({
			roomId: room.id,
			type: 'system',
			authorId: 'keenq',
			content: JSON.stringify([{ type: 'text', value: { text: 'match.youHave' } }])
		})

	await db
		.table('messages')
		.transacting(trx)
		.insert({
			roomId: room.id,
			type: 'system',
			authorId: 'keenq',
			content: JSON.stringify([{ type: 'greeting', value: { text: 'match.hi' } }])
		})
}

async function getMember(id, db) {
	return db.table('members').select().where('id', id).first()
}

async function notify(author, member, room, provider) {
	const data = {
		memberId: member.id,
		title: author?.name,
		body: 'newMatch',
		topic: 'newMatch',
		type: 'newMatch',
		url: `https://keenq.app/rooms/${room.id}`
	}
	await provider.send(data)
}

export default async function matched(body, db) {
	try {
		const { authorId, memberId, type } = validate(body, schema)
		const provider = getPushProvider()

		const [authorCreds, memberCreds] = await Promise.all([getCreds(authorId, db), getCreds(memberId, db)])
		await ensureCreds(authorCreds, authorId)
		await ensureCreds(memberCreds, memberId)

		let m

		const result = await transaction(db, async trx => {
			try {
				await check(authorId, memberId, type, db, trx)
				const room = await getRoom(authorId, memberId, db, trx)
				await add(authorId, memberId, room, db, trx)
				const author = await getMember(authorId, db)
				const member = await getMember(memberId, db)
				m = { member, author }
				await hi(room, db, trx)
				await notify(author, member, room, provider)
				return true
			} catch (error) {
				return false
			}
		})
		return success(m)
	}
	catch(e) {
		return error(e)
	}
}
