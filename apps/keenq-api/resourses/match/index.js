import match from './match.js'
import matched from './matched.js'


function matchHandler(app) {
	const db = app.diContainer.resolve('db')
	return async (req, res) => {
		const body = req.body
		const result = await match(body, db)
		return res.send(result)
	}
}

function matchedHandler(app) {
	const db = app.diContainer.resolve('db')
	return async (req, res) => {
		const body = req.body
		const result = await matched(body, db)
		return res.send(result)
	}
}

function matchRoutes(app, _, done) {
	app.post('/match', matchHandler(app))
	app.post('/matched', matchedHandler(app))
	done()
}

export default matchRoutes
