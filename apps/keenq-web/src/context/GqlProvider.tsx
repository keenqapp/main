import { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client'

import { client } from '@/providers/apollo'

function GqlProvider({ children }: { children: ReactNode }) {
  return (
    <ApolloProvider data-testid='GqlProvider' client={client}>
      {children}
    </ApolloProvider>
  )
}

export default GqlProvider
