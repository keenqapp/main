import { object, string } from 'yup'
import { getDb, getCreds, ensureCreds, success, error, validate, getId } from './shared.js'

const schema = object({
	name: string().required(),
	type: string().oneOf(['yes', 'no']).required(),
	authorId: string().required(),
})

const config = {
	client: 'pg',
	connection: {
		connectionString: process.env.DB_CONNECTION_STRING,
		ssl: { rejectUnauthorized: false },
	},
	pool: { min: 0, max: 2 }
}

async function create(name, type, db) {
	const id = getId()
	return db
		.table('rooms')
		.returning('*')
		.insert({
			id,
			name,
			type
		})
}

async function addOwner(memberId, roomId, db) {
	await db
		.table('room_members')
		.insert({
			roomId,
			memberId,
			role: 'owner'
		})
}

export async function main(body) {
	let db
	try {
		const { authorId, name, type } = validate(schema, body)
		db = getDb(config)

		const creds = await getCreds(db, authorId)
		await ensureCreds(creds)

		const room = await create(name, type, db)
		await addOwner(authorId, room.id, db)

		return success(test)
	}
	catch(e) {
		return error(e)
	}
	finally {
		db?.destroy()
	}
}
