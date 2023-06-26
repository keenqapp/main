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

async function getUser(phone, db) {
	try {
		return await db
			.table('credentials')
			.select()
			.where('phone', phone)
			.where('deletedAt', null)
			// TODO: Where clause for NOT banned
			.first()
	}
	catch(e) {
		throw { error: e }
	}
}

async function ensureUser(user, phone, db) {
	try {
	  if (!user) {
			const uid = nanoid()
			await db.table('credentials').insert({ phone, uid })
		  await db.table('profiles').insert({ uid })
		  await db.table('links').insert({ euid: uid, type: 'member', link: uid  })
	  }
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

export async function main({ phone }) {
	let db
	try {
	  db = getDb(config)
		const user = await getUser(phone, db)
		await ensureUser(user, phone, db)
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

main({ phone: '+111' })
