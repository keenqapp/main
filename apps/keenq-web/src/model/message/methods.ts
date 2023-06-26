import { differenceInMinutes, isSameDay, parseISO } from 'date-fns'

import { isAuthor } from '@/model/member'
import { IMessage, IMessageImage, IMessageReply, IMessageText, IPartnerRequest } from '@/model/message'
import { isPrivateRoom } from '@/model/room'


const MAX_DIFF_IN_MINUTES = 2
export function shouldShowCheck({ date, nextDate, authorUid, nextAuthorUid }: IMessage) {
	if (authorUid !== nextAuthorUid) return true
	if (!nextDate) return true
	const current = parseISO(date)
	const next = parseISO(nextDate)
	if (!isSameDay(current, next)) return true
	return differenceInMinutes(next, current) >= MAX_DIFF_IN_MINUTES
}

export function checkShowName({ authorUid, prevAuthorUid, date, prevDate }: IMessage, ruid: string) {
	const isPrivate = isPrivateRoom(ruid!)
	const isSelf = isAuthor(authorUid)
	if (isSelf || isPrivate) return false

	const isDifferentAuthor = authorUid !== prevAuthorUid
	if (isDifferentAuthor) return true
	if (!prevDate) return true

	const current = parseISO(date)
	const prev = parseISO(prevDate)
	const diff = differenceInMinutes(current, prev)
	if (!isSameDay(current, prev)) return true
	return diff > MAX_DIFF_IN_MINUTES
}

export function getText(message?: IMessage) {
	if (!message) return ''
	return message.content.find((c): c is IMessageText => c.type === 'text')?.value.text
}

export function getReply(message?: IMessage) {
	return message?.content.find((c): c is IMessageReply => c.type === 'reply')?.value
}

export function getImage(message?: IMessage) {
	return message?.content.find((c): c is IMessageImage => c.type === 'image')?.value
}

export function getImages(message?: IMessage) {
	return message?.content.filter((c): c is IMessageImage => c.type === 'image')?.map(c => c.value)
}

export function getPartnerRequest(message?: IMessage) {
	return message?.content.find((c): c is IPartnerRequest => c.type === 'partnerRequest')?.value
}
