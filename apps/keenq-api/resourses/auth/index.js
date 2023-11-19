import send from './send.js'
import verify from './verify.js'
import check from './check.js'


function authHandler(app) {
	const db = app.diContainer.resolve('db')
	return async (req, res) => {
		const body = req.body
		const result = await send(body, db)
		return res.send(result)
	}
}

function verifyHandler(app) {
	const db = app.diContainer.resolve('db')
	return async (req, res) => {
		const body = req.body
		const result = await verify(body, db)
		return res.send(result)
	}
}

function checkHandler(app) {
	const db = app.diContainer.resolve('db')
	return async (req, res) => {
		const body = req.body
		const result = await check(body, db)
		return res.send(result)
	}
}

function authRoutes(app, _, done) {
	app.post('/send', authHandler(app))
	app.post('/verify', verifyHandler(app))
	app.post('/check', checkHandler(app))
	done()
}

export default authRoutes
