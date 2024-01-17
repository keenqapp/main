import axios from 'axios'
import { success, error } from '../../shared.js'


const api = axios.create({
	baseURL: 'https://api.openai.com/v1/chat/completions',
	headers: {
		Authorization: `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
		'Content-Type': 'application/json',
		'OpenAI-Beta': 'assistants=v1'
	}
})

async function ask(question) {
	return (await api.post('', question))?.data
}

export default async function visiongpt(question) {
	try {
		const result = await ask(question)
		return success(result)
	}
	catch(e) {
		return error(e)
	}
}