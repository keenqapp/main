import { AnyVariables, DocumentInput, useMutation as _useMutation, UseMutationResponse } from 'urql'


export function useMutation<D, V extends AnyVariables>(query: DocumentInput<D, V>): UseMutationResponse<any, V> {
	return _useMutation(query)
}
