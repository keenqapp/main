import msg from './msg.js'
import push from './push.js'


function msgHandler(app) {
	const db = app.diContainer.resolve('db')
	return async (req, res) => {
		const body = req.body
		const result = await msg(body, db)
		return res.send(result)
	}
}

function pushHandler(app) {
	const db = app.diContainer.resolve('db')
	return async (req, res) => {
		const body = req.body
		const result = await push(body, db)
		return res.send(result)
	}
}

function pushRoutes(app, _, done) {
	app.post('/msg', msgHandler(app))
	app.post('/push', pushHandler(app))
	done()
}

export default pushRoutes
