import { success, error } from './shared.js'

export async function main(body, context) {
	try {
		return success({ body, context })
	}
	catch(e) {
		return error(e)
	}
}
