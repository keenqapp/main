import http from 'axios'
import { object, string } from 'yup'
import client from 'twilio'

import { success, error, validate, getDb, getId, isTestPhone } from './shared.js'



const schema = object({
	phone: string().required().matches(/^\+[1-9]\d{10,14}$/, 'Phone number is not valid'),
})

const config = {
	client: 'pg',
	connection: {
		connectionString: process.env.DB_CONNECTION_STRING,
		application_name: 'keenq-functions_auth_send',
		ssl: { rejectUnauthorized: false },
	},
	pool: { min: 0, max: 2 }
}

// TODO move all crap to adapter
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

async function ensureCredsAndMember(creds, phone, db) {
	try {
	  if (!creds) {
		  const isTester = isTestPhone(phone)
			const id = getId()
			await db.table('credentials').insert({ phone, id, isTester })
		  await db.table('members').insert({ id, isTester })
		  await db.table('links').insert({ entityId: id, type: 'member', link: id  })
	  }
		if (creds?.bannedAt) throw 'Member is banned'
	}
	catch(e) {
		throw { error: e }
	}
}

function fromTo(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function getCode() {
	return fromTo(1001, 9998)
}

async function save(phone, code, db) {
	return db
		.table('codes')
		.insert({
			phone,
			code
		})
		.onConflict('phone')
		.merge()
}

// TODO move all crap to adapter
async function sendSMS(phone, code, provider) {
	try {
		if (isTestPhone(phone)) return true
		else return provider
			.verify
			.v2
			.services(process.env.TWILIO_SERVICE_SID)
			.verifications
			.create({ to: phone, channel: 'sms', customCode: code })
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

		const code = getCode()
		await save(phone, code, db)
		const provider = getProvider()
		await sendSMS(phone, code, provider)

		return success({ result: true })
	}
	catch(e) {
		return error(e)
	}
	finally {
		db?.destroy()
	}
}
