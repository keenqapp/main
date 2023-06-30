// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useCallback, useEffect, useRef, useState } from 'preact/hooks'
import { DocumentNode, MutationHookOptions, TypedDocumentNode, useMutation } from '@apollo/client'
import { atom } from 'nanostores'


export function useDebounceState<T>(initValue: T, delay: number) {
	const [value, setValue] = useState<T>(initValue)
	const timerRef = useRef(null)
	// reset timer when delay changes
	useEffect(
		function () {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
				timerRef.current = null
			}
		},
		[delay]
	)
	const debounceSetValue = useCallback(
		function (val) {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
				timerRef.current = null
			}
			timerRef.current = setTimeout(function () {
				setValue(val)
			}, delay)
		},
		[delay]
	)
	return [value, debounceSetValue]
}

interface DebounceOptions {
	imediate?: boolean;
	initArgs?: any[];
}

const INIT_VALUE = -1
export function useDebounce(fn, delay: number, options: DebounceOptions = {}) {
	const [num, setNum] = useDebounceState(INIT_VALUE, delay)
	// save actual arguments when fn called
	const callArgRef = useRef(options.initArgs || [])
	// save real callback function
	const fnRef = useRef(fn)
	// wrapped function
	const trigger = useCallback(function () {
		callArgRef.current = [].slice.call(arguments)
		setNum((prev) => {
			return prev + 1
		})
	}, [])
	// update real callback
	useEffect(function () {
		fnRef.current = fn
	})
	useEffect(
		function () {
			if (num === INIT_VALUE && !options.imediate) {
				// prevent init call
				return
			}
			return fnRef.current.apply(null, callArgRef.current)
		},
		[num, options.imediate]
	)
	return trigger
}


const $saved = atom<MutationHookOptions|null>(null)

export function useDebounceMutation(gqp: DocumentNode|TypedDocumentNode, options?: any) {
	const [ opts, setOpts ] = useDebounceState(options, 1000)
	const result = useMutation(gqp, opts)
	useEffect(() => {
		if (equals($saved.get(), options)) return
		$saved.set(options)
		setOpts(options)
	}, [ options ])
	return result
}
