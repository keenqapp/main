import knex from 'knex'
import { diContainer } from '@fastify/awilix'
import { asFunction, Lifetime } from 'awilix'


const config = {
	client: 'pg',
	connection: {
		connectionString: process.env.DB_CONNECTION_STRING,
		application_name: 'keenq-api',
		ssl: {
			rejectUnauthorized: false,
		},
	},
	pool: { min: 0, max: 10 }
}

diContainer.register({
	db: asFunction(() => knex(config), { lifetime: Lifetime.SINGLETON, dispose: (module) => module.destroy() }),
})
