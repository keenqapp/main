import { cloneElement, ReactNode } from 'react'
import $equals from 'fast-deep-equal'

import 'large-small-dynamic-viewport-units-polyfill'
import { Entity } from '@/types/utility'


async function checkStructureClone() {
	if (!('structuredClone' in self || 'structuredClone' in globalThis)) {
		const structuredClone = await import('@ungap/structured-clone')
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		globalThis.structuredClone = structuredClone
	}
}
checkStructureClone()

interface Equals {
	(value: unknown, equals: unknown): boolean
	any(value: unknown, equals: unknown[]): boolean
}
const equals: Equals = function equals(value: unknown, equals: unknown): boolean {
	return $equals(value, equals)
}

function any(value: unknown, equals: unknown[]) {
	if (!equals?.length) return false
	return equals.some((item) => $equals(value, item))
}

equals.any = any

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
globalThis.equals = equals

export interface Dict {
  [key: string]: any
}

declare global {

	function pug(template: TemplateStringsArray): ReactNode

	const equals: Equals

	interface SerializableSet<T> extends Set<T> {
		toJSON(): T[]
	}

	interface ArrayConstructor {
		create(length: number): Array<number>;
	}

	interface Array<T>{
		create(length: number): Array<number>
		uniq(property?: string, flat?: boolean): Array<T>;
		first<T>(number?: number): T | T[] | undefined
		last(number?: number): T | T[] | undefined
		min(): T
		max(): T
		copySort(compareFn?: (a: T, b: T) => number): Array<T>
		copyPush(item: T): Array<T>
		copy(): Array<T>
		toComponents<T>(render: (item: T, index: number) => ReactNode): ReactNode[]
		toIds(): string[]
		excludeById(id: string | string[]): Array<T>
	}

  interface String {
    capitalize(): string
    decapitalize(): string
    cut(at: number, ellipsis?: boolean): string
  }

  interface Set<T> {
    copyAdd(value: T): Set<T>
    copyDelete(value: T): Set<T>
		copyToggle(value: T): Set<T>
		toArray(): T[]
  }

	interface Map<K, V> {
		copyAdd(key: K, value: V): Map<K, V>
		copyDelete(key: K): Map<K, V>
		toFlatArray(): V[]
	}
}

Object.defineProperty(Array.prototype, 'uniq', {
	value: function(property?: string) {
		if (property) {
			const cache = new Set()
			return this.filter((item: Dict) => {
				if (cache.has(item[property])) return false
				cache.add(item[property])
				return true
			})
		} else {
			return [...new Set(this)]
		}
	}
})

Object.defineProperty(Array.prototype, 'toIds', {
	value: function() {
		return this.map((item: Entity) => item.id)
	}
})

Object.defineProperty(Array, 'create', {
	value: function(length: number) {
		return [...Array(length).keys()]
	}
})

Object.defineProperty(Array.prototype, 'first', {
	value: function<T>(number?: number) {
		if (!this || this.length === 0) return undefined
		if (number) return this.slice(0, number) satisfies T[]
		return this[0] satisfies T
	}
})

Object.defineProperty(Array.prototype, 'last', {
	value: function<T>(number?: number) {
		if (!this || this.length === 0) return undefined
		if (number) return this.slice(-number) satisfies T[]
		return this[this.length - 1] satisfies T
	}
})

Object.defineProperty(Array.prototype, 'min', {
	value: function() {
		return Math.min.apply(null, this)
	}
})

Object.defineProperty(Array.prototype, 'max', {
	value: function() {
		return Math.max.apply(null, this)
	}
})

Object.defineProperty(Array.prototype, 'excludeById', {
	value: function(id: string | string[]) {
		return this.filter((item: Entity) => Array.isArray(id) ? !id.includes(item.id) : item.id !== id)
	}
})

Object.defineProperty(Array.prototype, 'copy', {
	value: function() {
		return structuredClone(this)
	}
})

Object.defineProperty(Array.prototype, 'copySort', {
	value: function(compareFn?: (a: (typeof this)[number], b: (typeof this)[number]) => number) {
		return structuredClone(this).sort(compareFn)
	}
})

Object.defineProperty(Array.prototype, 'copyPush', {
	value: function<T>(item: T): Array<T> {
		const arr = structuredClone(this)
		arr.push(item)
		return arr
	}
})

Object.defineProperty(Array.prototype, 'toComponents', {
	value: function<P extends Entity>(render: (item: P, index: number) => ReactNode) {
		return this
			.map((item: P, index: number) => {
				const component = render(item, index)
				if (!component) return null
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				return cloneElement(component, { key: item.id })
			})
			.filter(Boolean)
	}
})

Object.defineProperty(String.prototype, 'capitalize', {
	value: function() {
		return this.charAt(0).toUpperCase() + this.slice(1)
	}
})

Object.defineProperty(String.prototype, 'decapitalize', {
	value: function() {
		return this.charAt(0).toLowerCase() + this.slice(1)
	}
})

Object.defineProperty(String.prototype, 'cut', {
	value: function(at: number, ellipsis = false) {
		return this.length  > at ? this.slice(0, at) + (ellipsis ? '...' : '') : this
	}
})

Object.defineProperty(Set.prototype, 'toArray', {
	value: function() {
		return [...this]
	}
})

Object.defineProperty(Set.prototype, 'copyToggle', {
	value: function<T>(value: T) {
		return this.has(value) ? this.copyDelete(value) : this.copyAdd(value)
	}
})

Object.defineProperty(Set.prototype, 'copyAdd', {
	value: function<T>(value: T) {
		const set = this.add(value)
		return new Set(set)
	}
})

Object.defineProperty(Set.prototype, 'copyDelete', {
	value: function<T>(value: T) {
		this.delete(value)
		return new Set(this)
	}
})

Object.defineProperty(Map.prototype, 'copyAdd', {
	value: function<K, V>(key: K, value: V) {
		this.set(key, value)
		return new Map(this)
	}
})

Object.defineProperty(Map.prototype, 'copyDelete', {
	value: function<K>(key: K) {
		this.delete(key)
		return new Map(this)
	}
})

Object.defineProperty(Map.prototype, 'toFlatArray', {
	value: function() {
		return [...this.values()]
	}
})

class SerializableSet extends Set {
	toJSON() {
		console.log('--- polyfills.ts:214 -> toJSON -> ', 111)
		return Array.from(this)
	}
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
globalThis.SerializableSet = SerializableSet
