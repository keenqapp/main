import knex from 'knex'

const config = {
	client: 'pg',
	connection: process.env.PG_CONNECTION_STRING,
	searchPath: ['public'],
	pool: {
		min: 0,
		max: 7
	}
}

async function sendSMS(phone) {
	try {
		console.log('--- send.js:15 -> sendSMS -> to', phone)
	} catch(e) {
		return { success: false, reason: 'Could not send SMS', error: e }
	}
}

function getDb(config) {
	try {
		return knex(config)
	} catch(e) {
		throw { success: false, reason: 'Could not connect to database', error: e }
	}
}

async function getUser(phone, db) {
	try {
		return await db.table('credentials').select().where('phone', phone).first()
	} catch(e) {
		throw { success: false, error: e }
	}
}

async function ensureUser(user, phone, db) {
	try {
	  if (!user) {
			await db.table('credentials').insert({ phone })
	  }
	} catch(e) {
		throw { success: false, error: e }
	}
}

export async function main({ phone }) {
	try {
	  const db = getDb(config)
		const user = await getUser(phone, db)
		await ensureUser(user, phone, db)
		await sendSMS(phone)

		return { success: true }
	} catch(e) {
		return e
	}
}
