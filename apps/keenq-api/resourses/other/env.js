import { success, error } from '../../shared.js'


export default async function env(body) {
	try {
		console.log('env.js ---> env ---> 6: ', body)
		return success(true)
	}
	catch(e) {
		return error(e)
	}
}
