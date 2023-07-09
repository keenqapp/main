import knex from 'knex'
import jwt from 'jsonwebtoken'
import { object, string } from 'yup'

const schema = object({
	phone: string().required().matches(/^\+[1-9]\d{10,14}$/, 'Phone number is not valid'),
	code: string().required().length(6),
})

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

async function ensureMember(member) {
  if (!member) throw { error: 'Wrong credentials' }
	if (member?.bannedAt) throw { error: 'Member is banned' }
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

// TODO: check id for 'creds' and 'members' for sync
export async function main(body) {
	let db
	try {
		const { phone, code } = schema.validateSync(body)
	  db = getDb(config)
		const member = await getMember(phone, db)
		await ensureMember(member)
		await checkCode(phone, code, db)
		const accessToken = await generateJWT(member)

		return { body: { success: true, data: { accessToken, id: member.id } } }
	}
	catch(e) {
		console.error(e)
		return { body: { success: false, data: e } }
	}
	finally {
		db?.destroy()
	}
}
