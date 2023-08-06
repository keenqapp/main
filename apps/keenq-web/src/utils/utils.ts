import { cloneElement, VNode } from 'preact'

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

export function toComponent<Input extends Entity>(render: (item: Input, index: number) => VNode<Input>) {
	return (input: Input[]) => input
		.map((item: Input, index: number) => {
			const component = render(item, index)
			if (!component) return null
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

export const boolAtom = {
	encode: JSON.stringify,
	decode: JSON.parse,
}
