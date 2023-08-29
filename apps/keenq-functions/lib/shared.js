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
			.first()
	}
	catch(e) {
		throw { error: e }
	}
}

export function ensureCreds(creds) {
	if (!creds) throw { error: 'Wrong credentials' }
	if (creds?.bannedAt) throw { error: 'Member is banned' }
}

export function success(data) {
	return { body: { success: true, data } }
}

export function error(data) {
	return { body: { success: false, data } }
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
	'+79500131700', '+79312096251',
	'+79999999999',
	'+79999999998',
	'+79999999997',
	'+79999999996',
	'+79999999995',
	'+79999999994',
	'+79999999993',
	'+79999999992',
	'+79999999991',
	'+79999999990',
]
