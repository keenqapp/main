import { object, string,  } from 'yup'
import { generate } from 'random-words'

import { getDb, getMember, ensureMember, success, error, getId, validate } from './shared.js'


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

async function check(authorId, memberId, type, db) {
	if (type === 'no') throw { reason: 'This is "no" match' }

	const first = await db
		.table('matches')
		.select()
		.where('authorId', authorId)
		.where('memberId', memberId)
		.where('type', 'yes')
		.first()

	const second = await db
		.table('matches')
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

async function createRoom(db) {
	try {
		const id = getId()
		const name = generate({ exactly: 3, join: '-' })
		const room = await db
			.table('rooms')
			.returning('*')
			.insert({ id, name })
		return room[0]
	}
	catch(e) {
		throw { error: e }
	}
}

async function add(authorId, memberId, room, db) {
	const roomId = room.id
	try {
		const roomId = room.id
		await db
			.table('rooms_members')
			.insert([
				{ roomId, memberId: authorId, privateFor: memberId },
				{ roomId, memberId: memberId, privateFor: authorId },
			])
	}
	catch(e) {
		throw { error: e, reason: { roomId } }
	}
}

export async function main(body) {
	let db
	try {
		const { authorId, memberId, type } = validate(body, schema)
	  db = getDb(config)

		const [author, member] = await Promise.all([getMember(authorId, db), getMember(memberId, db)])
		await ensureMember(author)
		await ensureMember(member)

		const [f,s] = await check(authorId, memberId, type, db)
		// const room = await createRoom(db)
		// await add(authorId, memberId, room, db)

		return success([f,s])
	}
	catch(e) {
		return error(e)
	}
	finally {
		db?.destroy()
	}
}
