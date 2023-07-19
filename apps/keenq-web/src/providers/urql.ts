import { devtoolsExchange } from '@urql/devtools'
import { persistedExchange } from '@urql/exchange-persisted'
import { createClient as createWSClient } from 'graphql-ws'
import { cacheExchange, Client, fetchExchange, subscriptionExchange } from 'urql'

import { $accessToken } from '@/services/auth'


const wsClient = createWSClient({
	url: import.meta.env.VITE_GRAPHQL_ENDPOINT.replace('http', 'ws'),
	connectionParams: () => ({
		headers: {
			Authorization: `Bearer ${$accessToken.get()}`
		}
	}),
})


const client = new Client({
	url: import.meta.env.VITE_GRAPHQL_ENDPOINT,
	exchanges: [
		devtoolsExchange,
		cacheExchange,
		fetchExchange,
		subscriptionExchange({
			forwardSubscription(request) {
				const input = { ...request, query: request.query || '' }
				return {
					subscribe(sink) {
						const unsubscribe = wsClient.subscribe(input, sink)
						return { unsubscribe }
					},
				}
			},
		}),
		persistedExchange({
			preferGetForPersistedQueries: true,
		})
	],
	fetchOptions: () => ({
		headers: {
			authorization: `Bearer ${$accessToken.get()}`
		}
	})
})

export default client
