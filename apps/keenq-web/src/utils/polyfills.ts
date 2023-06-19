import $equals from 'fast-deep-equal'


interface Equals {
	(value: unknown, equals: unknown): boolean
	any(value: unknown, equals: unknown[]): boolean
}
const equals: Equals = function equals(value: unknown, equals: unknown): boolean {
	return $equals(value, equals)
}
function any(value: unknown, equals: unknown[]) {
	return equals.some((item) => $equals(value, item))
}

equals.any = any

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
globalThis.equals = equals

export interface Dict extends Object {
  [key: string]: any
}

declare global {

	const equals: Equals

	interface ArrayConstructor {
		create(length: number): Array<number>;
	}

	interface Array<T>{
		create(length: number): Array<number>
		uniq(property?: string, flat?: boolean): Array<T>;
		last(): T | undefined
		csort(compareFn?: (a: T, b: T) => number): Array<T>
	}

  interface String {
    capitalize(): string
    decapitalize(): string
    cut(at: number): string
  }

  interface Set<T> {
    copyAdd(value: any): Set<T>
    copyDelete(value: any): Set<T>
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

Object.defineProperty(Array, 'create', {
	value: function(length: number) {
		return [...Array(length).keys()]
	}
})

Object.defineProperty(Array.prototype, 'last', {
	value: function() {
		if (this.length === 0) return undefined
		return this[this.length - 1]
	}
})

Object.defineProperty(Array.prototype, 'csort', {
	value: function(compareFn?: (a: (typeof this)[number], b: (typeof this)[number]) => number) {
		return structuredClone(this).sort(compareFn)
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
	value: function(at: number) {
		return this.length  > at ? this.slice(0, at) + '...' : this
	}
})

Object.defineProperty(Set.prototype, 'copyAdd', {
	value: function(value: any) {
		const set = this.add(value)
		return new Set(set)
	}
})

Object.defineProperty(Set.prototype, 'copyDelete', {
	value: function(value: any) {
		this.delete(value)
		return new Set(this)
	}
})

async function checkStructureClone() {
	if (!('structuredClone' in self || 'structuredClone' in globalThis)) {
		const structuredClone = await import('@ungap/structured-clone')
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		globalThis.structuredClone = structuredClone
	}
}
checkStructureClone()
