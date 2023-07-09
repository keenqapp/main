import { AnyVariables, DocumentInput, useMutation } from 'urql'


export function useInsert<D, V extends AnyVariables = AnyVariables>(query: DocumentInput<D, V>) {
	const [result, _mutate] = useMutation(query)
	function mutate(object: any) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return _mutate({ object })
	}
	return [result, mutate] as [typeof result, typeof mutate]
}
