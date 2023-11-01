import id from './id.js'


function idHandler(app) {
	const db = app.diContainer.resolve('db')
	return async (req, res) => {
		const body = req.body
		const result = await id(body, db)
		return res.send(result)
	}
}

function utilsRoutes(app, _, done) {
	app.post('/id', idHandler(app))
	done()
}

export default utilsRoutes
