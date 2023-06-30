import { useEffect, useRef } from 'preact/hooks'
import { DocumentNode, TypedDocumentNode, useMutation } from '@apollo/client'


export function useDebounceMutation(gqp: DocumentNode|TypedDocumentNode, options?: any) {
	const timer = useRef<Timer|null>(null)
	const [ update, ...rest ] = useMutation(gqp, options)
	useEffect(() => {
		if (timer.current) clearTimeout(timer.current)
		timer.current = setTimeout(() => {
			update(options)
		}, 1500)
	}, [ JSON.stringify(options) ])
	return [ update, ...rest ]
}
