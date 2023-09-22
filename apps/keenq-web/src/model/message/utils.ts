// export function toColor(str: string) {
// 	let hash = 0
// 	for (let i = 0; i < str.length; i++) {
// 		hash = str.charCodeAt(i) + ((hash << 5) - hash)
// 	}
// 	let color = '#'
// 	for (let i = 0; i < 3; i++) {
// 		const value = (hash >> (i * 8)) & 0xFF
// 		color += ('00' + value.toString(16)).padStart(2, '0')
// 	}
// 	return color
// }

import theme from '@/ui/theme'


export const toColor = (str: string) => {
	if (!str) return theme.color.primary
	let hash = 0
	str.split('').forEach(char => {
		hash = char.charCodeAt(0) + ((hash << 5) - hash)
	})
	let colour = '#'
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xff
		colour += value.toString(16).padStart(2, '0')
	}
	return colour.replaceAll('f', 'a')
}
