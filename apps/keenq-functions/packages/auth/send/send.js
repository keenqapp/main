import knex from 'knex'

const config = {
	client: 'pg',
	connection: {
		connectionString: process.env.PG_CONNECTION_STRING,
		ssl: { rejectUnauthorized: false }
	}
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
		return await db.table('credentials').select().where('phone', phone).first()
	}
	catch(e) {
		throw { error: e }
	}
}

async function ensureUser(user, phone, db) {
	try {
	  if (!user) {
			await db.table('credentials').insert({ phone })
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
	try {
	  const db = getDb(config)
		const user = await getUser(phone, db)
		await ensureUser(user, phone, db)
		await sendSMS(phone)

		return { body: { success: true } }
	}
	catch(e) {
		return { body: { success: false, data: e } }
	}
}
