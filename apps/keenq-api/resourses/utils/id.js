import { success, error, getId } from '../../shared.js'

export default async function main() {
	try {
		const id = getId()
		return success({ id })
	}
	catch(e) {
		return error(e)
	}
}
