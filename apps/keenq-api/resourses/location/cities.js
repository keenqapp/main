import axios from 'axios'

import { success, error } from '../../shared.js'



const key = process.env.GOOGLE_MAPS_API_KEY
const url = (params) => `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`

async function getCity({ input, language, location }) {
	const params = {
		key,
		input,
		language,
		...(location ? { location } : {}),
		types: '(cities)',
		radius: '4000',
		rankby: 'distance'
	}
	const query = (new URLSearchParams(params)).toString()
	const result = await axios.get(url(query))
	return result?.data?.predictions
}

export default async function cities({ input, language, location }) {
	try {
		const data = await getCity({ input, language, location })
		return success(data)
	}
	catch(e) {
		return error(e)
	}
}
