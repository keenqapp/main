import axios from 'axios'
import { success, error } from '../../shared.js'

let cache = {
	date: null,
	rates: null
}

async function getRates() {
	if (cache.rates && cache.date >= Date.now()) return cache.rates
	let url = 'http://data.fixer.io/api/latest?access_key=44f13e26047ce6151339cc637fc30fb7'
	const result = (await axios.get(url))?.data?.rates || null
	cache = {
		date: (new Date()).setDate((new Date).getDate() + 1),
		rates: result
	}
	return cache.rates
}

export default async function rates() {
	try {
		const rates = await getRates()
		return success(rates)
	}
	catch(e) {
		return error(e)
	}
}
