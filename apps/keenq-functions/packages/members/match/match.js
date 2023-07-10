import knex from 'knex'
import { object, string } from 'yup'


const schema = object({
	id: string().required(),
})

const config = {
	client: 'pg',
	connection: {
		connectionString: process.env.DB_CONNECTION_STRING,
		ssl: { rejectUnauthorized: false },
	},
	pool: { min: 0, max: 2 }
}

function getDb(config) {
	try {
		return knex(config)
	}
	catch(e) {
		throw { reason: 'Could not connect to database', error: e }
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

async function getMatch(id, db) {
	try {
		const matched = await db
			.table('members')
			.select()
			.where('deletedAt', null)
			.where('bannedAt', null)
			.where('visible', true)
			.where('done', true)
			.whereNot('id', id)
			.first()
		if (!matched) throw 'No match found'
		return matched
	}
	catch(e) {
		throw { error: e }
	}
}

export async function main(body) {
	let db
	try {
		const { id } = schema.validateSync(body)
	  db = getDb(config)
		const member = await getMember(id, db)
		await ensureMember(member)
		const match = await getMatch(id, db)

		return { body: { success: true, data: match } }
	}
	catch(e) {
		console.error(e)
		return { body: { success: false, data: e } }
	}
	finally {
		db?.destroy()
	}
}
