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

async function create(uid, db) {
	try {
		await db.table('profiles').insert({ uid })
		await db.table('links').insert({ euid: uid, type: 'member', link: nanoid() })
	}
	catch(e) {
		throw { error: e }
	}
}

export async function main({ uid }) {
	let db
	try {
	  db = getDb(config)
		await create(uid, db)

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
