import { useEffect } from 'react'


export default function useAsyncEffect(fn: any, deps: any[]) {
	return useEffect(() => {
		const promise = fn()
		return () => {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			promise.then(unsubscribe => unsubscribe === null || unsubscribe === void 0 ? void 0 : unsubscribe())
		}
	}, deps)
}
