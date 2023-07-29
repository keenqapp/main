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

async function checkCode(phone, code, db) {
	if (code === '1111') {
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
		await checkCode(phone, code, db)
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
