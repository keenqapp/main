import knex from 'knex'
import { customAlphabet } from 'nanoid'
import getMemberByUid from './getMemberByUid'


const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet, 8)

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

async function getMember(uid, db) {
	try {
		return await db
			.table('credentials')
			.select()
			.where('uid', uid)
			.where('deletedAt', null)
			.first()
	}
	catch(e) {
		throw { error: e }
	}
}

async function ensureMember(member) {
	if (!member) throw { error: 'Member doesnt exists' }
	if (member.bannedAt) throw { error: 'Member is banned' }
}

async function getMatch(uid, db) {
	try {
		return {
			for: uid,
			matched: true,
		}
	}
	catch(e) {
		throw { error: e }
	}
}

export async function main({ uid }) {
	let db
	try {
	  db = getDb(config)
		const member = await getMember(uid, db)
		await ensureMember(member)
		const match = await getMatch(uid, db)

		return { body: { success: true, data: match } }
	}
	catch(e) {
		console.error(e)
		return { body: { success: false, data: e } }
	}
	finally {
		db?.destroy()
	}
}
