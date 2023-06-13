import { ID } from '@/types/types'
import { Output } from '@mui/icons-material'
import { IMessage } from '@/components/Room/RoomMessages'


export function toId(i: string | number) {
	return String(i) as ID
}

export function toIds(i: string[] | number[]) {
	return i.map(String) as ID[]
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

export function pipe<Output, Input = any>(...fns: Array<(input: Input) => Output>): Output {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return (input: Input) => fns.reduce((acc, fn) => fn(acc), input)
}

export function map<Input, Output>(fn: (input: Input) => Output) {
	return (input: Input[]) => input.map(fn)
}

export function sort<Input>(fn: (a: Input, b: Input) => number) {
	return (input: Input[]) => input.csort(fn)
}

export function reduce<Input, Output>(fn: (previousValue: Output, currentValue: Input, currentIndex: number, array: Input[]) => Output, init: Output) {
	return (input: Input[]) => input.reduce(fn, init)
}
