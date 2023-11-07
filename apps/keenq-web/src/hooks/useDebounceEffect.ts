import { useEffect, useRef } from 'preact/hooks'


export function useDebounceEffect(fnc: any, deps: any[], delay: number = 500) {
	const ref = useRef<Timer>()
	useEffect(() => {
		clearTimeout(ref.current)
		ref.current = setTimeout(() => {
			fnc()
			clearTimeout(ref.current)
		}, delay)
	}, [fnc, ...deps, delay])
}
