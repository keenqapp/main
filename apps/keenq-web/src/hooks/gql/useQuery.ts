import { useEffect, useMemo, useRef, useState } from 'preact/hooks'
import { AnyVariables, useQuery as _useQuery, UseQueryArgs, UseQueryResponse } from 'urql'
import uuid from 'uuid-random'


function usePrevious(value) {
	const [ unique, setUnique ] = useState('')
	const prev = useRef()
	useEffect(() => {
		if (!(value?.data === undefined && prev.current?.data === undefined) && equals(prev.current?.data, value?.data)) return
		prev.current = value
		setUnique(uuid())
	}, [value])
	return unique
}

export interface UseQueryOptions {
	requestPolicy?: 'cache-first' | 'cache-and-network' | 'network-only' | 'cache-only'
	context?: any
	pause?: boolean
}

export function useQuery<D, V extends AnyVariables = AnyVariables>(query: UseQueryArgs<V, D>['query'], variables?: V | null, options?: UseQueryOptions): UseQueryResponse<D, V> | UseQueryResponse<D> {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const [ _result, ...rest ] =  _useQuery({ query, ...(variables ? { variables } : {}), ...(options ? options : {}) })
	const need = usePrevious(_result)
	const result = useMemo(() => _result, [ need ])
	return [ result, ...rest ]
}

// export function useQuery<D, V extends AnyVariables = AnyVariables>(query: UseQueryArgs<V, D>['query'], variables?: V | null, options?: UseQueryOptions): UseQueryResponse<D, V> | UseQueryResponse<D> {
// 	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// 	// @ts-ignore
// 	return _useQuery({ query, ...(variables ? { variables } : {}), ...(options ? options : {}) })
// }
