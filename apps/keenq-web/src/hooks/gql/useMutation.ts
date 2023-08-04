import { AnyVariables, DocumentInput, useMutation as _useMutation } from 'urql'


export function useMutation<D, V extends AnyVariables = AnyVariables>(query: DocumentInput<D, V>) {
	const [ result, _mutate ] = _useMutation(query)
	function mutate(variables?: V) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return _mutate(variables)
	}
	return [result, mutate] as [ typeof result, typeof mutate ]
}
