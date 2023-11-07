import match from './match/index.js'
import auth from './auth/index.js'
import push from './push/index.js'
import utils from './utils/index.js'
import location from './location/index.js'

export default function routes(app, _, done) {
	app.get('/', async (req, res) => res.send({ ok: true, date: new Date().toISOString(), version: process.env.VERSION }))
	app.register(match, { prefix: '/match' })
	app.register(auth, { prefix: '/auth' })
	app.register(push, { prefix: '/push' })
	app.register(utils, { prefix: '/utils' })
	app.register(location, { prefix: '/location' })
	done()
}
