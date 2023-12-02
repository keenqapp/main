import Fastify from 'fastify'
import * as Sentry from '@sentry/node'
import { ProfilingIntegration } from '@sentry/profiling-node'
import env from '@fastify/env'
import { fastifyAwilixPlugin } from '@fastify/awilix'
import cors from '@fastify/cors'

import 'dotenv/config'

import './services/db.js'
import routes from './resourses/index.js'


Sentry.init({
	dsn: 'https://298bc1105eecdb8ff486fb16e1724ce0@o4506144731627520.ingest.sentry.io/4506145857142784',
	integrations: [
		new ProfilingIntegration(),
	],
	tracesSampleRate: 1.0,
	profilesSampleRate: 1.0,
	environment: process.env.NODE_ENV || 'production',
})

const app = Fastify({
	logger: true
})

const schema = {
	type: 'object',
	properties: {
		DB_CONNECTION_STRING: true,
		JWT_SECRET: true,
		VAPID_PUBLIC_KEY: true,
		VAPID_PRIVATE_KEY: true,
		TWILIO_SERVICE_SID: true,
		TWILIO_ACCOUNT_SID: true,
		TWILIO_AUTH_TOKEN: true,
		VERSION: true
	}
}

const envOptions = {
	schema,
	dotenv: true
}

await app.register(env, envOptions)
await app.register(fastifyAwilixPlugin, { disposeOnClose: true, disposeOnResponse: true })
await app.register(cors, { origin: [ 'http://localhost:5173', 'https://calc.cheap', 'https://calque.app' ] })
await app.register(routes)

app.listen({ host: '0.0.0.0', port: process.env.PORT || 9003 })
