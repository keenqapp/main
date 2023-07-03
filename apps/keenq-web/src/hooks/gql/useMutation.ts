import { AnyVariables, DocumentInput, useMutation as _useMutation, UseMutationState } from 'urql'


export function useUpdate<D, V extends AnyVariables>(query: DocumentInput<D, V>) {
	const [ result, _mutate ] = _useMutation(query)
	function mutate(uid: string, data: any) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return _mutate({ uid, data })
	}

	return [ result, mutate ] as [ UseMutationState<D, V>, typeof mutate ]
}
