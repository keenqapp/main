import jwt from 'jsonwebtoken'
import { object, string } from 'yup'

import { getDb, ensureCreds, success, error, validate } from './shared.js'

const schema = object({
	phone: string().required().matches(/^\+[1-9]\d{10,14}$/, 'Phone number is not valid'),
	code: string().required().length(4)
})

const config = {
	client: 'pg',
	connection: {
		connectionString: process.env.DB_CONNECTION_STRING,
		ssl: { rejectUnauthorized: false }
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

async function getSaved(phone, db) {
	return db
		.select()
		.from('codes')
		.where('phone', phone)
		.first()
}

async function checkCode(phone, code, saved, db) {
	if (code === saved) {
		try {
			await db
				.table('credentials')
				.update({ verified: true, lastLoginAt: new Date().toISOString() })
				.where('phone', phone)
				.where('deletedAt', null)
			await db
				.table('codes')
				.delete()
				.where('phone', phone)
			return true
		} catch(e) {
			throw { error: e }
		}
	}
	else throw { error: 'Wrong credentials' }
}

function getPayload(member) {
	return {
		sub: member.id,
		iat: Math.floor(Date.now() / 1000),
		aud: 'keenq-web',
		iss: 'keenq-functions',
		'https://hasura.io/jwt/claims': {
			'X-Hasura-User-Id': member.id,
			'X-Hasura-Role': "member",
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

export async function main(body) {
	let db
	try {
		const { phone, code } = validate(body, schema)
	  db = getDb(config)

		const creds = await getCreds(phone, db)
		await ensureCreds(creds)

		const saved = await getSaved(phone, db)
		await checkCode(phone, code, saved.code, db)
		const accessToken = await generateJWT(creds)

		return success({ accessToken, id: creds.id })
	}
	catch(e) {
		return error(e)
	}
	finally {
		db?.destroy()
	}
}
