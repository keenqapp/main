import { ComponentChildren } from 'preact'
import { Provider } from 'urql'

import client from '@/providers/urql'


function GqlProvider({ children }: { children: ComponentChildren }) {
	return (
		<Provider data-testid='GqlProvider' value={client}>
			{children}
		</Provider>
	)
}

export default GqlProvider
