import knex from 'knex'


const config = {
	client: 'pg',
	connection: {
		connectionString: process.env.KEENQ_CONNECTION_STRING,
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

async function create(uid, db) {
	try {
		await db.table('profiles').insert({ uid })
	}
	catch(e) {
		throw { error: e }
	}
}

export async function main({ uid }) {
	let db
	try {
	  db = getDb(config)
		await create(uid, db)

		return { body: { success: true, data: {} } }
	}
	catch(e) {
		console.error(e)
		return { body: { success: false, data: e } }
	}
	finally {
		db?.destroy()
	}
}
