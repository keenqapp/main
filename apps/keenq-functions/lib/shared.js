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

export async function getMember(id, db) {
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

export function ensureMember(member) {
	if (!member) throw { error: 'Wrong credentials' }
	if (member?.bannedAt) throw { error: 'Member is banned' }
}

export function success(data) {
	return { body: { success: true, data } }
}

export function error(data) {
	return { body: { success: false, data } }
}

export function getId() {
	const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	return customAlphabet(alphabet, 8)
}

export function validate(body, schema) {
	try {
		return schema.validateSync(body)
	}
	catch(e) {
		throw { error: e }
	}
}
