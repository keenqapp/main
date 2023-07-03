import { AnyVariables, useQuery as _useQuery, UseQueryResponse } from 'urql'


export function useQuery<V extends AnyVariables>(query: any, variables?: V): UseQueryResponse<any, V> | UseQueryResponse<any> {
	return _useQuery({ query, ...(variables ? { variables } : {}) })
}
