import { useEffect, useMemo, useRef, useState } from 'react'
import { AnyVariables, useQuery as _useQuery, UseQueryArgs, UseQueryResponse } from 'urql'
import uuid from 'uuid-random'


function usePrevious(value: any, _?: string) {
	const [ unique, setUnique ] = useState('')
	const prev = useRef<any>()
	useEffect(() => {
		if (!(value?.data === undefined && prev.current?.data === undefined) && equals(prev.current?.data, value?.data) && !value.stale) return
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

export function useQuery<D, V extends AnyVariables = AnyVariables>(query: UseQueryArgs<V, D>['query'], variables?: V | null, options?: UseQueryOptions, debug?: string): UseQueryResponse<D, V> | UseQueryResponse<D> {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const [ _result, ...rest ] =  _useQuery({ query, ...(variables ? { variables } : {}), ...(options ? options : {}) })
	const need = usePrevious(_result, debug)

	if (debug) {
		console.log('--- useQuery.ts:34 -> useQuery -> need', debug, need)
	}

	const result = useMemo(() => _result, [ need ])

	if (debug) {
		console.log('--- useQuery.ts:34 -> useQuery -> result', debug, result.data)
	}

	return [ _result, ...rest ]
}

// export function useQuery<D, V extends AnyVariables = AnyVariables>(query: UseQueryArgs<V, D>['query'], variables?: V | null, options?: UseQueryOptions): UseQueryResponse<D, V> | UseQueryResponse<D> {
// 	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// 	// @ts-ignore
// 	return _useQuery({ query, ...(variables ? { variables } : {}), ...(options ? options : {}) })
// }
