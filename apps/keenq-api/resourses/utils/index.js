import id from './id.js'
import rates from './rates.js'


function idHandler(app) {
	const db = app.diContainer.resolve('db')
	return async (req, res) => {
		const body = req.body
		const result = await id(body, db)
		return res.send(result)
	}
}

function ratesHandler(app) {
	// const db = app.diContainer.resolve('db')
	return async (req, res) => {
		// const body = req.body
		const result = await rates()
		return res.send(result)
	}
}

function utilsRoutes(app, _, done) {
	app.post('/id', idHandler(app))
	app.get('/rates', ratesHandler(app))
	done()
}

export default utilsRoutes
