import { object, string } from 'yup'
import { getDb, getCreds, ensureCreds, success, error, validate } from './shared.js'

const schema = object({
	id: string().required(),
	payload: object()
})

const config = {
	client: 'pg',
	connection: {
		connectionString: process.env.DB_CONNECTION_STRING,
		ssl: { rejectUnauthorized: false },
	},
	pool: { min: 0, max: 2 }
}

async function getMember(id, db) {
	return db.table('members').select('push').where('id', id).first()
}

async function send(payload, endpoint) {

}

export async function main(body) {
	let db
	try {
		const { id, payload } = validate(schema, body)
		db = getDb(config)

		const creds = await getCreds(id, db)
		await ensureCreds(creds)

		const endpoint = await getMember(id, db)

		await send(payload, endpoint)

		return success({ endpoint })
	}
	catch(e) {
		return error(e)
	}
	finally {
		db?.destroy()
	}
}
