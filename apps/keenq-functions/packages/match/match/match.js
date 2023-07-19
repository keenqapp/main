import knex from 'knex'
import { createClient } from 'redis'

import { object, string } from 'yup'


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

async function searchMatch(id, not, db) {
	const match = await db
		.table('members')
		.select('members.id')
		.leftJoin('matches', 'members.id', 'matches.memberId')
		.whereNot('members.id', id)
		.whereNull('matches.authorId')
		.where('members.deletedAt', null)
		.where('members.bannedAt', null)
		.where('members.visible', true)
		.where('members.done', true)
		.first()
	if (!match) throw 'Not match found'
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
