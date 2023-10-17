import jwt from 'jsonwebtoken'
import { object, string, number } from 'yup'
import client from 'twilio'

import { getDb, ensureCreds, success, error, validate, isTestPhone } from './shared.js'


const schema = object({
	phone: string().required().matches(/^\+[1-9]\d{10,14}$/, 'Phone number is not valid'),
	code: string().required()
})

const config = {
	client: 'pg',
	connection: {
		connectionString: process.env.DB_CONNECTION_STRING,
		application_name: 'keenq-functions_auth_verify',
		ssl: { rejectUnauthorized: false }
	},
	pool: { min: 0, max: 2 }
}

function getProvider() {
	return client(
		process.env.TWILIO_ACCOUNT_SID,
		process.env.TWILIO_AUTH_TOKEN
	)
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

async function checkCode(to, code, provider, db) {
	if (isTestPhone(to)) return true

	const saved = await db.table('codes').select().where('phone', to).first()
	if (!saved) throw { reason: 'error.noSaved' }
	const savedCode = String(saved.code)

	let success = false
	if (savedCode.length === 4) {
		if (savedCode === String(code)) success = true
	}
	else {
		const result = await provider
			.verify.v2.services(process.env.TWILIO_SERVICE_SID)
			.verificationChecks
			.create({ to, code })
		if (result.status === 'approved') success = true
	}
	if (!success) throw { reason: 'error.wrongCreds' }
	await db.table('codes').where('phone', to).del()
	await db
		.table('credentials')
		.update({ verified: true, lastLoginAt: new Date().toISOString() })
		.where('phone', to)
		.where('deletedAt', null)
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
		await ensureCreds(creds, phone)

		const provider = getProvider()
		await checkCode(phone, code, provider, db)

		const accessToken = await generateJWT(creds)

		return success({ accessToken, id: creds.id })
	}
	catch(e) {
		console.error(e)
		return error(e)
	}
	finally {
		db?.destroy()
	}
}

// main({ phone: '+380999999999', code: 1234 })
