import { format, parse, parseISO } from 'date-fns'


export function formatNumber(number: number | string, currency?: string) {
	if (!number) return ''
	const parts = number.toString().split('.')
	parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
	if (parts[1]) parts[1] = parts[1].substring(0, 2)
	return `${parts.join('.')} ${(currency || '')}`
}

const defaultDateFormat = 'HH:mm dd MMM'
type formatDateOptions = { from?: string, to?: string }
export function formatDate(date: string | Date, options?: formatDateOptions) {
	try {
		const parsed = date instanceof Date
			? date
			: options?.from ? parse(date, options?.from, new Date()) : parseISO(date)
		return format(parsed, options?.to || defaultDateFormat)
	} catch(e) {
		return date instanceof Date ? date.toLocaleString() : date
	}
}

function random(min: number, max: number) {
	return Math.floor(Math.random() * (max - min + 1) + min)
}

// TODO move to reduce
export function formatDistance(distance?: number, t?: any) {
	if (distance === undefined || distance === null) return t?.('match.someDistance')
	const km = Math.floor(distance / 1000)
	if (km < 10) return random(1, 10) + ' km'
	if (km < 20) return random(10, 20) + ' km'
	if (km < 100) return random(20, 100) + ' km'
	if (km < 200) return random(100, 200) + ' km'
	if (km < 500) return random(200, 500) + ' km'
	if (km < 1000) return random(500, 1000) + ' km'
	if (km < 1500) return random(1000, 1500) + ' km'
	if (km < 2000) return random(1500, 2000) + ' km'
	return random(2000, 10000) + ' km'
}
