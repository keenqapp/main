import knex from 'knex'
import { object, string } from 'yup'
import { customAlphabet } from 'nanoid'

import { success, error, validate, getDb, getId } from './shared.js'

const schema = object({
	phone: string().required().matches(/^\+[1-9]\d{10,14}$/, 'Phone number is not valid'),
})

const config = {
	client: 'pg',
	connection: {
		connectionString: process.env.DB_CONNECTION_STRING,
		ssl: { rejectUnauthorized: false },
	},
	pool: { min: 0, max: 2 }
}

async function getCreds(phone, db) {
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

async function ensureCredsAndMember(creds, phone, db) {
	try {
	  if (!creds) {
			const id = getId()
			await db.table('credentials').insert({ phone, id })
		  await db.table('members').insert({ id })
		  await db.table('links').insert({ entityId: id, type: 'member', link: id  })
	  }
		if (creds?.bannedAt) throw 'Member is banned'
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

export async function main(body) {
	let db
	try {
		const { phone } = validate(body, schema)
	  db = getDb(config)
		const creds = await getCreds(phone, db)
		await ensureCredsAndMember(creds, phone, db)
		await sendSMS(phone)
		return success(true)
	}
	catch(e) {
		return error(e)
	}
	finally {
		db?.destroy()
	}
}
