import { useRef } from 'preact/hooks'
import { AnyVariables, DocumentInput, useMutation, UseMutationState } from 'urql'


export function useDebounceMutation<D = any, V extends AnyVariables = AnyVariables>(query: DocumentInput<D, V>) {
	const timer = useRef<Timer|null>(null)
	const [ result, _mutate ] = useMutation(query)

	async function mutate<V extends AnyVariables = AnyVariables>(id: string, data: V) {
		if (timer.current) clearTimeout(timer.current)
		timer.current = setTimeout(() => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			_mutate({ id, data })
		}, 2000)
	}
	return [ result, mutate ] as [ UseMutationState<D, V>, typeof mutate ]
}
