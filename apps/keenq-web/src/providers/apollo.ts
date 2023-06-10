import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { accessToken } from '@/services/auth'


const headers = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      Authorization: accessToken.value ? `Bearer ${accessToken.value}` : '',
    }
  }
})

const link = new HttpLink({
  uri: import.meta.env.VITE_GRAPHQL_ENDPOINT,
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: headers.concat(link)
})
