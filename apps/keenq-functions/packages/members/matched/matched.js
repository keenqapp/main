import knex from 'knex'
import { customAlphabet } from 'nanoid'
import { object, string,  } from 'yup'
import { generate } from 'random-words'


const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet, 8)

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

function getDb(config) {
	try {
		return knex(config)
	}
	catch(e) {
		throw { reason: 'Could not connect to database', error: e }
	}
}

async function getMember(id, db) {
	try {
		return await db
			.table('credentials')
			.select()
			.where('id', id)
			.where('deletedAt', null)
			.first()
	}
	catch(e) {
		throw { error: e }
	}
}

async function ensureMember(member) {
	if (!member) throw { error: 'Member doesnt exists' }
	if (member?.bannedAt) throw { error: 'Member is banned' }
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
}

async function createRoom(db) {
	try {
		const id = nanoid()
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
				{ roomId, memberId: authorId },
				{ roomId, memberId: memberId },
			])
	}
	catch(e) {
		throw { error: e, reason: { roomId } }
	}
}

export async function main(body) {
	let db
	try {
		const { authorId, memberId, type } = schema.validateSync(body)
	  db = getDb(config)

		const [author, member] = await Promise.all([getMember(authorId, db), getMember(memberId, db)])
		await ensureMember(author)
		await ensureMember(member)

		await check(authorId, memberId, type, db)
		const room = await createRoom(db)
		// await add(authorId, memberId, room, db)

		return { body: { success: true, data: room } }
	}
	catch(e) {
		console.error(e)
		return { body: { success: false, data: e } }
	}
	finally {
		db?.destroy()
	}
}
