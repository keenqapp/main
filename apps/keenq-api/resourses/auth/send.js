import http from 'axios'
import { object, string } from 'yup'
import client from 'twilio'

import { success, error, validate, getId, isTestPhone } from '../../shared.js'


const url = (phone, code) => `https://sms.ru/sms/send?api_id=A80649CB-0FF7-B273-E2A3-64F7CCFE904D&to=${phone}&msg=Код+для+входа+в+ваш+keenq:+${code}&json=1`

const schema = object({
	phone: string().required().matches(/^\+[1-9]\d{10,14}$/, 'Phone number is not valid')
})

function fromTo(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

function getCode() {
	return fromTo(1001, 9998)
}

// TODO move all crap to adapter
function getProvider(phone) {
	if (phone.startsWith('+7')) return {
		send: async () => {
			const code = getCode()
			await http.get(url(phone, code))
			return code
		},
	}
	else {
		return {
			send: async () => {
				const result = await client(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
					.verify.v2.services(process.env.TWILIO_SERVICE_SID)
					.verifications
					.create({ to: phone, channel: 'sms' })
				return result.sid
			}
		}
	}
}

async function getCreds(phone, db) {
	return db
		.table('credentials')
		.select()
		.where('phone', phone)
		.where('deletedAt', null)
		.first()
}

async function ensureCredsAndMember({ creds, phone, db }) {
	if (!creds) {
		const isTester = isTestPhone(phone)
		const id = getId()
		await db.table('credentials').insert({ phone, id, isTester: false })
		await db.table('members').insert({ id, isTester: false })
		await db.table('links').insert({ entityId: id, type: 'member', url: id, authorId: 'keenq-api-send'  })
		return true
	}
	if (creds?.bannedAt) throw 'Member is banned'
	return false
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

export default async function send(body, db) {
	try {
		const { phone } = validate(body, schema)

		const creds = await getCreds(phone, db)
		await ensureCredsAndMember({ creds, phone, db })

		const provider = getProvider(phone)
		const code = await provider.send()

		await save(phone, code, db)

		return success({ phone })
	}
	catch(e) {
		return error(e)
	}
}
