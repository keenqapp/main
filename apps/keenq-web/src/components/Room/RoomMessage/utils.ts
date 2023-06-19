import { differenceInMinutes, isSameDay, parseISO } from 'date-fns'

import { IMessage } from '@/types/messages'


export function isAuthor(uid: string) {
	return uid === 'me'
}

export function isPrivateRoom(uid: string) {
	return uid !== 'public'
}

export function isAdmin(memberUid: string, roomUid: string) {
	return equals.any(memberUid, ['me', '1']) && roomUid === 'public'
}

const MAX_DIFFERENCE_IN_MINUTES = 2
export function shouldShowCheck({ date, nextDate, authorUid, nextAuthorUid }: IMessage) {
	if (authorUid !== nextAuthorUid) return true
	if (!nextDate) return true
	const current = parseISO(date)
	const next = parseISO(nextDate)
	if (!isSameDay(current, next)) return true
	return differenceInMinutes(next, current) >= MAX_DIFFERENCE_IN_MINUTES
}

export function toColor(str: string) {
	let hash = 0
	for (let i = 0; i < str.length; i++) {
		hash = str.charCodeAt(i) + ((hash << 5) - hash)
	}
	let color = '#'
	for (let i = 0; i < 3; i++) {
		const value = (hash >> (i * 8)) & 0xFF
		color += ('00' + value.toString(16)).substr(-2)
	}
	return color
}
