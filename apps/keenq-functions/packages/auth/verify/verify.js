import knex from 'knex'
import jwt from 'jsonwebtoken'

const config = {
	client: 'pg',
	connection: {
		connectionString: process.env.DB_CONNECTION_STRING,
		ssl: { rejectUnauthorized: false }
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

async function ensureUser(user) {
  if (!user) throw { error: 'Wrong credentials' }
}

async function checkCode(phone, code, db) {
	if (code === '111111') {
		try {
			await db
				.table('credentials')
				.update({ verified: true, lastLoginAt: new Date().toISOString() })
				.where('phone', phone)
				.where('deletedAt', null)
			return true
		} catch(e) {
			throw { error: e }
		}
	}
	else throw { error: 'Wrong credentials' }
}

function getPayload(user) {
	return {
		sub: user.uid,
		iat: Math.floor(Date.now() / 1000),
		aud: 'keenq-web',
		iss: 'keenq-functions',
		'https://hasura.io/jwt/claims': {
			'x-hasura-default-role': "member",
			'x-hasura-allowed-roles': ['admin', 'manager', 'member'],
		}
	}
}

async function generateJWT(user) {
	try {
		return await jwt.sign(getPayload(user), process.env.JWT_SECRET)
	}
	catch(e) {
		throw { error: e }
	}
}

export async function main({ phone, code }, context) {
	let db
	try {
	  db = getDb(config)
		const user = await getUser(phone, db)
		await ensureUser(user)
		await checkCode(phone, code, db)
		const accessToken = await generateJWT(user)

		return { body: { success: true, data: { accessToken, uid: user.uid } } }
	}
	catch(e) {
		console.error(e)
		return { body: { success: false, data: e } }
	}
	finally {
		db?.destroy()
	}
}
