import knex from 'knex'
import { customAlphabet } from 'nanoid'
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

async function getMember(phone, db) {
	try {
		return await db
			.table('credentials')
			.select()
			.where('phone', phone)
			.where('deletedAt', null)
			.first()
	}
	catch(e) {
		throw { error: e }
	}
}

async function ensureMember(member, phone, db) {
	try {
	  if (!member) {
			const id = nanoid()
			await db.table('credentials').insert({ phone, id })
		  await db.table('members').insert({ id })
		  await db.table('links').insert({ entityId: id, type: 'member', link: id  })
	  }
		if (member?.bannedAt) throw 'Member is banned'
	}
	catch(e) {
		throw { error: e }
	}
}

async function sendSMS(phone) {
	try {
		console.log('--- send.js:39 -> sendSMS -> phone', phone)
	}
	catch(e) {
		throw { reason: 'Could not send SMS', error: e }
	}
}

// TODO: check id for 'creds' and 'members' for sync
export async function main({ phone }) {
	let db
	try {
	  db = getDb(config)
		const member = await getMember(phone, db)
		await ensureMember(member, phone, db)
		await sendSMS(phone)

		return { body: { success: true, data: {} } }
	}
	catch(e) {
		console.error(e)
		return { body: { success: false, data: e } }
	}
	finally {
		db?.destroy()
	}
}
