import { Signal as $$Signal, signal as $$signal } from '@preact/signals-core'


export const SignalProxyType = Symbol('SignalProxy')
export const primitives = ['string', 'number', 'boolean', 'undefined', 'symbol', 'bigint']

type Unwrap<T> = T extends Signal<infer U> ? U : T


export interface Signal<T> extends Function {
	(input: T | Unwrap<T> | ((prev: T | Unwrap<T>) => T), nested?: boolean): void
	(): T
	clear(): void

	$type: typeof SignalProxyType
	$signal: $$Signal<T>
	$init: T
	$nested: boolean
}

export function walk<K extends string | number | symbol, T>(object: Record<K, T>) {
	return Object.entries(object).reduce((acc, [key, value]) => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		acc[key as K] = signal<T>(value as T)
		return acc
	}, {} as Record<K, Signal<T>>)
}

export default function signal<T>(value: T, nested = true) {
	let proxy: Signal<T> | Signal<Signal<T>[]> | Signal<Record<keyof T, Signal<T[keyof T]>>>
	const $init = value

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	if (typeof value === 'function') proxy = value
	else if (
		primitives.includes(typeof value) ||
		value === null ||
		!nested ||
		value instanceof Set
	) proxy = createProxy(value) as Signal<T>
	else if (Array.isArray(value)) proxy = createProxy(value.map(item => signal(item))) as Signal<Signal<T>[]>
	else proxy = createProxy(walk<keyof T, T[keyof T]>(value)) as Signal<Record<keyof T, Signal<T[keyof T]>>>

	function _clear() {
		proxy($init)
	}
	proxy.$init = $init
	proxy.clear = _clear

	return proxy as (
		// REFACTOR make Function typings
		// eslint-disable-next-line @typescript-eslint/ban-types
		// T extends Function
		// 	? T
		// 	: T extends Array<infer U>
		T extends Set<infer U>
			? Signal<Set<U>>
			: T extends Array<infer U>
				? Signal<Signal<U>[]>
				: T extends Record<keyof T, infer U>
					? Signal<Record<keyof T, Signal<U>>>
					: Signal<T>
		)
}

export function assign<T>(target: $$Signal, value: T) {
	if (!target) return
	else if (value === null) target.value = value
	else if (Array.isArray(value)) target.value = value.map(item => item(value))
	else if (typeof value === 'object') {
		for (const key in value) {
			if (target.value[key].$type === SignalProxyType) target.value[key](value[key])
			else target.value[key] = value[key]
		}
	}
	else target.value = value
}

function createProxy<T>(value: T, nested = true): Signal<T> {
	const $signal = $$signal(value)
	function _get() {
		return $signal.value
	}
	function _set(input: any) {
		if (typeof input === 'function') assign($signal, input(_get()))
		else assign($signal, input)
	}
	const proxy = new Proxy(function signalProxy(){ return undefined }, {
		apply(_: any, that: any, args: any[]): T|void {
			if (args.length === 0) return Reflect.apply(_get, that, args)
			else Reflect.apply(_set, that, args)
		}
	})
	proxy.$type = SignalProxyType
	proxy.$signal = $signal
	proxy.$nested = nested

	return proxy
}
