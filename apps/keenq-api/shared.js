import knex from 'knex'
import { customAlphabet } from 'nanoid'

export function getDb(config) {
	try {
		return knex(config)
	}
	catch(e) {
		throw { reason: 'Could not connect to database', error: e }
	}
}

export async function getCreds(id, db) {
	try {
		return db
			.table('credentials')
			.select()
			.where('id', id)
			.where('deletedAt', null)
			// .first()
	}
	catch(e) {
		throw { error: e }
	}
}

export function ensureCreds(creds, uid) {
	if (!creds) throw { error: 'error.wrongCreds', reason: `${uid} is not exist` }
	if (creds?.bannedAt) throw { error: 'error.wrongCreds', reason: `${uid} is banned`  }
}

export async function ensureCredsAndMember({ creds, phone, db }) {
	if (creds?.bannedAt) throw { reason: 'Member is banned' }
	if (!creds) {
		const isTester = isTestPhone(phone)
		const id = getId()
		await db.table('credentials').insert({ phone, id, isTester: false })
		await db.table('members').insert({ id, isTester: false })
		await db.table('links').insert({ entityId: id, type: 'member', url: id, authorId: 'keenq-api-check'  })
		return true
	}
	return false
}

export function success(data) {
	const total = Array.isArray(data) ? data.length : 1
	return { success: true, total, data, ...(data ? { id: data?.id || data[0]?.id } : {}) }
}

export function error(data) {
	console.error('--- error', data)
	throw { success: false, data }
}

export function getId() {
	const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	return customAlphabet(alphabet, 8)()
}

export function validate(body, schema) {
	try {
		return schema.validateSync(body)
	}
	catch(e) {
		throw { error: e }
	}
}

export async function transaction(db, fn) {
	try {
		return await db.transaction(fn)
	}
	catch(e) {
		throw { error: e }
	}
}

export const testPhones = [
	'+79500131700',
	'+79312096251',
]

export function isTestPhone(phone) {
	if (testPhones.includes(phone)) return true
	if (/^\+79{8}\d{2}/.test(phone)) return true
	return false
}
