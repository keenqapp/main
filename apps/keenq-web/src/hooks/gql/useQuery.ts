import { AnyVariables, useQuery as _useQuery, UseQueryArgs, UseQueryResponse } from 'urql'


export interface UseQueryOptions {
	requestPolicy?: 'cache-first' | 'cache-and-network' | 'network-only' | 'cache-only'
	context?: any
}

export function useQuery<D, V extends AnyVariables = AnyVariables>(query: UseQueryArgs<V, D>['query'], variables?: V | null, options?: UseQueryOptions): UseQueryResponse<D, V> | UseQueryResponse<D> {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return _useQuery({ query, ...(variables ? { variables } : {}), ...(options ? options : {}) })
}
