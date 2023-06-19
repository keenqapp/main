import { signal as $$signal } from '@preact/signals-core'


const primitives = ['string', 'number', 'boolean', 'undefined', 'symbol', 'bigint']

function walk<K extends string | number | symbol, T>(object: Record<K, T>) {
	return Object.entries(object).reduce((acc, [key, value]) => {
		acc[key as K] = signal<T>(value as T)
		return acc
	}, {} as Record<K, Signal<T>>)
}

interface Signal<T> {
	(value: T, nested?: boolean): void
	(): T
}

type ReturnSignal<T> = T extends object
	? T extends Array<T>
		? Signal<Signal<T>[]>
		: Signal<Record<keyof T, Signal<T[keyof T]>>>
	: Signal<T>

const SignalProxyType = Symbol('SignalProxy')

export function signal<T>(value: T, nested = true): Signal<T> {
	if (typeof value === 'function') return value
	if (primitives.includes(typeof value) || value === null || !nested) return createProxy(value) as Signal<T>
	if (Array.isArray(value)) return createProxy(value.map(signal)) as Signal<Signal<T>[]>
	return createProxy(walk<keyof T, T[keyof T]>(value)) as Signal<Record<keyof T, Signal<T[keyof T]>>>
}

function assign<T>(target: any, value: any) {
	if (!target) return
	else if (value === null) target.value = value
	else if (Array.isArray(value)) target.value = value.map(signal)
	else if (typeof value === 'object') {
		for (const key in value) {
			if (target.value[key].$type === SignalProxyType) target.value[key](value[key])
			else target.value[key] = value[key]
		}
	}
	else target.value = value
}

function createProxy<T>(value: T, nested = true) {
	const $signal = $$signal(value)
	function _get() {
		return $signal.value
	}
	function _set(value: T) {
		assign($signal, value)
	}
	const proxy = new Proxy(function signalProxy(){}, {
		apply(_: any, that: any, args: any[]): T|void {
			if (args.length === 0) return Reflect.apply(_get, that, args)
			else Reflect.apply(_set, that, args)
		}
	})
	proxy.$signal = $signal
	proxy.$type = SignalProxyType
	proxy.$nested = nested
	return proxy
}
