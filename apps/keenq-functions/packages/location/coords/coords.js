import knex from 'knex'
import axios from 'axios'


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
const url = (params) => `https://maps.googleapis.com/maps/api/geocode/json?${params}`

async function getCoords(place) {
	try {
		const params = {
			key,
			place_id: place,
		}
		const query = (new URLSearchParams(params)).toString()
		return (await axios.get(url(query))).data?.results[0].geometry.location
	} catch(e) {
		throw { error: e }
	}
}

async function ensureUser(user, phone, db) {
	if (!user) throw { error: 'Wrong credentials' }
}

export async function main({ uid, place }) {
	let db
	try {
		db = getDb(config)
		const user = await getUser(uid, db)
		await ensureUser(user)
		const data = await getCoords(place)

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
