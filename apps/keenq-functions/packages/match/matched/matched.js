import { object, string,  } from 'yup'
import { generate } from 'random-words'

import { getDb, ensureCreds, success, error, getId, validate, getCreds, transaction } from './shared.js'


const schema = object({
	authorId: string().required(),
	memberId: string().required(),
	type: string().oneOf(['yes', 'no']).required(),
})

const config = {
	client: 'pg',
	connection: {
		connectionString: process.env.DB_CONNECTION_STRING,
		ssl: { rejectUnauthorized: false },
	},
	pool: { min: 0, max: 2 }
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
			first,
			second
		}
	}

	return [first, second]
}

async function createRoom(db, trx) {
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
			content: JSON.stringify([{ type: 'greeting', value: { text: 'Hi!' } }])
		})
}

export async function main(body) {
	let db
	try {
		const { authorId, memberId, type } = validate(body, schema)
	  db = getDb(config)

		const [author, member] = await Promise.all([getCreds(authorId, db), getCreds(memberId, db)])
		await ensureCreds(author)
		await ensureCreds(member)

		await transaction(db, async trx => {
			await check(authorId, memberId, type, db, trx)
			const room = await createRoom(db, trx)
			await add(authorId, memberId, room, db, trx)
			await hi(room, db, trx)
			return room
		})

		return success({ result: true })
	}
	catch(e) {
		return error(e)
	}
	finally {
		db?.destroy()
	}
}
