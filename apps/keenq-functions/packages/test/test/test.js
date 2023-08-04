import knex from 'knex'
import { object, string } from 'yup'
import { getDb, getCreds, ensureCreds, success, error, validate } from './shared.js'

const schema = object({
	test: string().required(),
})

const config = {
	client: 'pg',
	connection: {
		connectionString: process.env.DB_CONNECTION_STRING,
		ssl: { rejectUnauthorized: false },
	},
	pool: { min: 0, max: 2 }
}

export async function main(body) {
	let db
	try {
		const { test } = validate(schema, body)
		db = getDb(config)

		return success(test)
	}
	catch(e) {
		console.error(e)
		return error(e)
	}
	finally {
		db?.destroy()
	}
}

main({ test: 'test' })
