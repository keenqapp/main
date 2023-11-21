import jwt from 'jsonwebtoken'
import { object, string } from 'yup'
import axios from 'axios'

import { success, error, validate, isTestPhone, ensureCredsAndMember } from '../../shared.js'


const schema = object({
	phone: string().required().matches(/^\+[1-9]\d{10,14}$/, 'Phone number is not valid'),
	token: string().required()
})

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

const URL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com'

async function checkToken(phone, token, db) {
	if (isTestPhone(phone)) return true
	const kid = jwt.decode(token, { complete: true })?.header.kid
	const key = (await axios.get(URL))?.data?.[kid]
	const result = jwt.verify(token, Buffer.from(key))
	if (phone !== result.phone_number) throw { reason: 'auth.wrongCode' }
	await db
		.table('credentials')
		.update({ verified: true, lastLoginAt: new Date().toISOString() })
		.where('phone', phone)
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

export default async function check(body, db) {
	try {
		const { phone, token } = validate(body, schema)

		const creds = await getCreds(phone, db)
		await ensureCredsAndMember({ creds, phone, db })

		await checkToken(phone, token, db)

		const accessToken = await generateJWT(creds)

		return success({ accessToken, id: creds.id })
	}
	catch(e) {
		return error(e)
	}
}
