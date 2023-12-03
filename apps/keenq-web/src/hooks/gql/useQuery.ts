import { useMemo } from 'react'
import { AnyVariables, useQuery as _useQuery, UseQueryArgs, UseQueryResponse } from 'urql'

import { usePrevious } from '@/utils/utils'


export interface UseQueryOptions {
	requestPolicy?: 'cache-first' | 'cache-and-network' | 'network-only' | 'cache-only'
	context?: any
	pause?: boolean
}

export function useQuery<D, V extends AnyVariables = AnyVariables>(query: UseQueryArgs<V, D>['query'], variables?: V | null, options?: UseQueryOptions, debug?: string): UseQueryResponse<D, V> | UseQueryResponse<D> {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const [ _result, ...rest ] =  _useQuery({ query, ...(variables ? { variables } : {}), ...(options ? options : {}) })
	const need = usePrevious(_result, debug)
	const result = useMemo(() => _result, [ need ])
	return [ result, ...rest ]
}
