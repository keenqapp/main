import { object, string } from 'yup'

import { getDb, getMember, ensureMember, success, error } from './shared.js'


const schema = object({
	id: string().required(),
})

const dbConfig = {
	client: 'pg',
	connection: {
		connectionString: process.env.DB_CONNECTION_STRING,
		ssl: { rejectUnauthorized: false },
	},
	pool: { min: 0, max: 2 }
}

async function searchNew(id, db) {
	return db
		.select('members.id')
		.from(function () {
			this
				.select('*')
				.from('members')
				.where(function () {
					this
						.whereNot('members.id', id)
						.where('members.deletedAt', null)
						.where('members.bannedAt', null)
						.where('members.visible', true)
						.where('members.done', true)
				})
				.as('members')
		})
		.whereNotIn('id', function () {
			this
				.select('memberId')
				.from('matches')
				.where('authorId', id)
		})
		.whereNotIn('id', function () {
			this
				.select('authorId')
				.from('matches')
				.where('memberId', id)
				.where('type', 'no')
		})
		.first()
}

async function searchSeen(id, db) {
	return db
		.select('members.id')
		.from(function () {
			this
				.select('*')
				.from('members')
				.where(function () {
					this
						.whereNot('members.id', id)
						.where('members.deletedAt', null)
						.where('members.bannedAt', null)
						.where('members.visible', true)
						.where('members.done', true)
				})
				.as('members')
		})
		.whereNotIn('id', function () {
			this
				.select('memberId')
				.from('matches')
				.where('authorId', id)
				.whereIn('type', ['yes', 'no'])
		})
		.whereNotIn('id', function () {
			this
				.select('authorId')
				.from('matches')
				.where('memberId', id)
				.where('type', 'no')
		})
		.first()
}

async function searchMatch(id, db) {
	let match
	match = await searchNew(id, db)
	if (!match) match = await searchSeen(id, db)
	if (!match) throw { id: null, reason: 'Not match found' }
	return match
}

async function getMatch(id, db) {
	return searchMatch(id, db)
}

export async function main(body) {
	let db

	try {
		const { id } = schema.validateSync(body)

	  db = getDb(dbConfig)

		const member = await getMember(id, db)
		await ensureMember(member)

		const match = await getMatch(id, db)

		return success(match)
	}
	catch(e) {
		return error(e)
	}
	finally {
		db?.destroy()
	}
}
