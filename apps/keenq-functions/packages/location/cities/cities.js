import knex from 'knex'
import axios from 'axios'
// import { customAlphabet } from 'nanoid'
// const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
// const nanoid = customAlphabet(alphabet, 8)


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
			// TODO: Where clause for NOT banned
			.first()
	}
	catch(e) {
		throw { error: e }
	}
}

const key = process.env.GOOGLE_MAPS_API_KEY
const url = (params) => `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`

async function getCity(input, location) {
	try {
		const params = {
			key,
			input,
			location,
			types: '(cities)',
			radius: '4000',
			rankby: 'distance'
		}
		const query = (new URLSearchParams(params)).toString()
		return (await axios.get(url(query))).data.predictions
	} catch(e) {
		throw { error: e }
	}
}

async function ensureCreds(member, db) {
	if (!member) throw { error: 'Member doesnt exists' }
}

export async function main({ id, input, location }) {
	let db
	try {
		db = getDb(config)
		const creds = await getCreds(id, db)
		await ensureCreds(member)
		const data = await getCity(input, location)

		return { body: { success: true, data } }
	}
	catch(e) {
		console.error(e)
		return { body: { success: false, data: e } }
	}
	finally {
		db?.destroy()
	}
}
