import { cacheExchange, Client, fetchExchange } from 'urql'

import { $accessToken } from '@/services/auth'


const client = new Client({
	url: import.meta.env.VITE_GRAPHQL_ENDPOINT,
	exchanges: [cacheExchange, fetchExchange],
	fetchOptions: () => ({
		headers: { authorization: `Bearer ${$accessToken.get()}` }
	})
})

export default client
