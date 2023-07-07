import { AnyVariables, useQuery as _useQuery, UseQueryResponse } from 'urql'


export interface UseQueryOptions {
	requestPolicy?: 'cache-first' | 'cache-and-network' | 'network-only' | 'cache-only'
	context?: any
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export function useQuery<D = any, V extends AnyVariables>(query: any, variables?: V | null, options?: UseQueryOptions): UseQueryResponse<D, V> | UseQueryResponse<D> {
	return _useQuery({ query, ...(variables ? { variables } : {}), ...(options ? options : {}) })
}
