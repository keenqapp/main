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

export function formatDistance(distance?: number) {
	if (!distance) return 'Some distance'
	const km = Math.floor(distance / 1000)
	if (km < 10) return Math.floor(Math.random() * 10) + 1 + ' km'
	if (km < 20) return Math.floor(Math.random() * 20) + 10 + ' km'
	if (km < 100) return Math.floor(Math.random() * 100) + 20 + ' km'
	if (km < 1000) return Math.floor(Math.random() * 1000) + 100 + ' km'
	return Math.floor(Math.random() * 10000) + 1000 + ' km'
}
