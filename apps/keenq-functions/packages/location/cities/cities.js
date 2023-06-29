import knex from 'knex'
import { customAlphabet } from 'nanoid'
const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
const nanoid = customAlphabet(alphabet, 8)


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

async function getUser(uid, db) {
	try {
		return await db
			.table('credentials')
			.select()
			.where('uid', uid)
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
		return (await axios.get(url(query))).data
	} catch(e) {
		throw { error: e }
	}
}

async function ensureUser(user, phone, db) {
	if (!user) throw { error: 'Wrong credentials' }
}

export async function main({ uid, input, location }) {
	let db
	try {
		db = getDb(config)
		const user = await getUser(uid, db)
		await ensureUser(user)
		// const result = await getCity(input, location)
		// const data = result.predictions.map(({ description }) => description)
		const params = {
			key,
			input,
			location,
			types: '(cities)',
			radius: '4000',
			rankby: 'distance'
		}
		return { body: { success: true, data: params } }
	}
	catch(e) {
		console.error(e)
		return { body: { success: false, data: e } }
	}
	finally {
		db?.destroy()
	}
}

main({ phone: '+111' })
