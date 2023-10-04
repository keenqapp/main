import { devtoolsExchange } from '@urql/devtools'
import { cacheExchange, offlineExchange } from '@urql/exchange-graphcache'
import { makeDefaultStorage } from '@urql/exchange-graphcache/default-storage'
import { createClient as createWSClient } from 'graphql-ws'
import { Client, fetchExchange, subscriptionExchange } from 'urql'

import { $accessToken } from '@/services/auth'


const storage = makeDefaultStorage({
	idbName: 'keenq',
})

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
		cacheExchange({
			directives: {
				local(directiveArgs)  {
					console.log('--- urql.ts:30 -> local ->', directiveArgs)
					return (parent, args, cache, info) => {
						console.log('--- urql.ts:32 ->  ->', parent, args, cache, info)
						return null
					}
				}
			}
		}),
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
		offlineExchange({ storage }),
	],
	fetchOptions: () => ({
		headers: {
			authorization: `Bearer ${$accessToken.get()}`
		}
	})
})

export default client
