import { cloneElement, ReactNode, useEffect, useRef, useState } from 'react'
import { customAlphabet } from 'nanoid'
import uuid from 'uuid-random'

import { Entity, UID } from '@/types/utility'


export function toId(i: string | number) {
	return String(i) as UID
}

export function toIds(i: string[] | number[]) {
	return i.map(String) as UID[]
}

export function setClipboard(text: string) {
	const type = 'text/plain'
	const blob = new Blob([text], { type })
	const data = [new ClipboardItem({ [type]: blob })]
	navigator.clipboard.write(data)
}

export function nullString(string: string|null = null) {
	return string || null
}

export function pipe<Input, Output>(data: Input, ...fns: ((...args: any[]) => any)[]): Output {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return fns.reduce((acc, fn) => fn(acc), data)
}

export function map<Input, Output>(fn: (input: Input) => Output) {
	return (input: Input[]) => input.map(fn)
}

// export function groupBy(key: string) {
// 	return (input: any[]) => console.log('--- utils.ts:36 ->  ->', key, _groupBy(input))
// }

export function toComponent<Input extends Entity>(render: (item: Input, index: number) => ReactNode) {
	return (input: Input[]) => input
		.map((item: Input, index: number) => {
			const component = render(item, index)
			if (!component) return null
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			return cloneElement(component, { key: item.id })
		})
		.filter(Boolean)
}

export function sort<Input>(fn: (a: Input, b: Input) => number) {
	return (input: Input[]) => input.copySort(fn)
}

export function reduce<Input, Output>(fn: (previousValue: Output, currentValue: Input, currentIndex: number, array: Input[]) => Output, init: Output) {
	return (input: Input[]) => input.reduce(fn, init)
}

export function equals(left: any, right: any) {
	return left === right
}

export function first<T>(count: number) {
	return (input: T[]) => input.slice(0, count)
}

export function match(input: string, str: string) {
	const pattern = '.*' + input.split('').join('.*') + '.*'
	const re = new RegExp(pattern, 'i')
	return re.test(str)
}

export function pipelog(input: any) {
	console.log('--- utils.ts:73 -> log ->', input)
	return input
}

export function merge(left: object, right: object) {
	return { ...left, ...right }
}

export function optional<T>(input: T): Exclude<T, undefined> {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return input || {}
}

// export function guard(input: unknown) {
// 	return input
// }

// function resolve<T extends (...args: any[]) => ReturnType<T>>(fn: T): Promise<ReturnType<T>> {
// 	return new Promise((resolve, reject) => { fn(resolve, reject) })
// }

export function loadScript(src: string, position: HTMLElement | null, id: string) {
	if (!position) {
		return
	}

	const script = document.createElement('script')
	script.setAttribute('async', '')
	script.setAttribute('id', id)
	script.src = src
	position.appendChild(script)
}

function reviver(key: string, value: unknown) {
	if (key === ''
		&& typeof value === 'object'
		&& value !== null
		&& !Array.isArray(value)
		// eslint-disable-next-line no-prototype-builtins
		&& value.hasOwnProperty('$')
	) {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		return new Map(Object.entries(value['$']))
	}
	// if (key.startsWith('$')) {
	// 	if (typeof value === 'object' && value !== null && !Array.isArray(value)) return new Map(Object.entries(value))
	// 	if (Array.isArray(value)) return new Set(value)
	// }
	return value
}

function replacer(key: string, value: unknown) {
	if (value instanceof Map && key !== '$') return { $: Object.fromEntries(value) }
	if (value instanceof Set) return Array.from(value)
	return value
}

export const json = {
	encode: (v: unknown) => JSON.stringify(v, replacer),
	decode: (v: string) => JSON.parse(v, reviver),
}

export function isIOS() {
	return [
		'iPad Simulator',
		'iPhone Simulator',
		'iPod Simulator',
		'iPad',
		'iPhone',
		'iPod'
	].includes(navigator.platform)
		|| (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
}

export function isPWA() {
	return window.matchMedia('(display-mode: standalone)').matches
}

export function getId() {
	const alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
	return customAlphabet(alphabet, 8)()
}

export async function timeout(duration: number) {
	return new Promise(resolve => setTimeout(resolve, duration))
}

export function usePrevious(value: any, _?: string) {
	const [ unique, setUnique ] = useState('')
	const prev = useRef<any>()
	useEffect(() => {
		if (_ === '111') {
			console.log('utils.ts --->  ---> 169: ', prev.current?.data, value?.data,  prev.current?.data === value?.data)
		}
		if (!(value?.data === undefined && prev.current?.data === undefined) && equals(prev.current?.data, value?.data) && !value.stale) return
		prev.current = value
		setUnique(uuid())
	}, [value])
	return unique
}
