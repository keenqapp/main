import cities from './cities.js'


function citiesHandler() {
	return async (req, res) => {
		const body = req.body
		const result = await cities(body)
		return res.send(result)
	}
}


function matchRoutes(app, _, done) {
	app.post('/cities', citiesHandler())
	done()
}

export default matchRoutes
