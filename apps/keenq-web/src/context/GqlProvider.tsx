import { ComponentChildren } from 'preact'
import { ApolloProvider } from '@apollo/client'

import { client } from '@/providers/apollo'

function GqlProvider({ children }: { children: ComponentChildren }) {
  return (
    <ApolloProvider data-testid='GqlProvider' client={client}>
      {children}
    </ApolloProvider>
  )
}

export default GqlProvider
