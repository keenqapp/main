import knex from 'knex'
import { createClient } from 'redis'

import { array, object, string } from 'yup'


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

const redisConfig = {
	url: process.env.REDIS_URL,
}

function getDb(config) {
	try {
		return knex(config)
	}
	catch(e) {
		throw { reason: 'Could not connect to database', error: e }
	}
}

async function getRedis(config) {
	try {
		const client =  createClient(config)
		await client.connect()
		return client
	}
	catch(e) {
		throw { reason: 'Could not connect to redis', error: e }
	}
}

async function getMember(id, db) {
	try {
		return await db
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

async function ensureMember(member) {
	if (!member) throw { error: 'Member doesnt exists' }
	if (member?.bannedAt) throw { error: 'Member is banned' }
}

async function searchNew(id, not, db) {
	return db
		.select('members.id', 'matches.type')
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
}

async function searchSeen(id, not, db) {
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

async function searchMatch(id, not, db) {
	let match
	match = await searchNew(id, not, db)
	// if (!match) match = await searchSeen(id, not, db)
	if (!match) throw { id: null, reason: 'Not match found' }
	return match
}

// function path(id) {
// 	return `match/${id}`
// }
//
// async function updateCache({ id, matched, db, redis }) {
// 	const match = await searchMatch(id, matched, db)
// 	if (!match) throw 'No match found'
// 	redis.set(path(id), match)
// }

// async function getMatch(id, db, redis) {
// 	try {
// 		const cached = await redis.get(path(id))
// 		if (cached) {
// 			updateCache({ id, db, redis })
// 			return cached
// 		}
// 		else {
// 			const matched = await searchMatch(id, null, db)
// 			updateCache({ id, matched, db, redis })
// 			return matched
// 		}
// 	}
// 	catch(e) {
// 		throw { error: e }
// 	}
// }

async function getMatch(id, db, redis) {
	return searchMatch(id, null, db)
}

export async function main(body) {
	let db
	let redis

	try {
		const { id } = schema.validateSync(body)

	  db = getDb(dbConfig)
		redis = await getRedis(redisConfig)

		const member = await getMember(id, db)
		await ensureMember(member)

		const match = await getMatch(id, db, redis)

		return { body: { success: true, data: match } }
	}
	catch(e) {
		console.error(e)
		return { body: { success: false, data: e } }
	}
	finally {
		redis?.quit()
		db?.destroy()
	}
}

main({ id: 'boris' })
