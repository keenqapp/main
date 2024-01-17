import visiongpt from './visiongpt.js'
import env from './env.js'


function visiongptHandler() {
	return async (req, res) => {
		const body = req.body
		const result = await visiongpt(body)
		return res.send(result)
	}
}

function envHandler() {
	return async (req, res) => {
		const body = req.body
		const result = await env(body)
		return res.send(result)
	}
}

const config = {
	config: {
		rateLimit: {
			max: 1,
			timeWindow: 2000
		}
	}
}

function utilsRoutes(app, _, done) {
	app.post('/visiongpt', config, visiongptHandler())
	app.post('/env', envHandler())
	done()
}

export default utilsRoutes