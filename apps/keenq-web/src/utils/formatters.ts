import { format, parse, parseISO } from 'date-fns'
import ru from 'date-fns/locale/ru'

import { $locale } from '@/services/translate'

import { formats } from '@/utils/phoneFormats'


let locale: Locale | undefined = undefined

$locale.subscribe((lang) => {
	if (lang === 'ru-RU') locale = ru
})

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
		return format(parsed, options?.to || defaultDateFormat, { locale })
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


export function asYouType(input: string): string {
	// Removing all non-numeric characters
	const numericInput = input.replace(/\D+/g, '')

	// Define some country code formats
	// Find the matching format
	let format
	let skipDigits = 0 // This is used to skip the country code digits.
	for (const countryCode in formats) {
		if (numericInput.startsWith(countryCode)) {
			format = formats[countryCode]
			skipDigits = countryCode.length
			break
		}
	}

	// If no specific format is found, default to a generic one
	if (!format) {
		format = ['+', '##', ' ', '##########'] // Generic international
	}

	let result = ''
	let index = skipDigits
	for (const piece of format) {
		if (piece.includes('#')) {
			const chunkSize = piece.length
			const chunk = numericInput.substring(index, index + chunkSize)
			result += chunk
			index += chunkSize
		} else {
			result += piece
		}
	}

	while (result.endsWith(' ') || result.endsWith('-') || result.endsWith(')')) {
		result = result.slice(0, -1)
	}

	return result
}
