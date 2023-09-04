import { differenceInMinutes, isSameDay, parseISO } from 'date-fns'

import { $isAuthor, useCurrentMember } from '@/model/member'
import { IGreeting, IJoined, IMessage, IMessageImage, IMessageReply, IMessageText, IPartnerRequest } from '@/model/message'
import { $isPrivate, IRoom } from '@/model/room'


const MAX_DIFF_IN_MINUTES = 2
export function shouldShowCheck({ date, nextDate, authorId, nextAuthorId }: IMessage) {
	if (authorId !== nextAuthorId) return true
	if (!nextDate) return true
	const current = parseISO(date)
	const next = parseISO(nextDate)
	if (!isSameDay(current, next)) return true
	return differenceInMinutes(next, current) >= MAX_DIFF_IN_MINUTES
}

export function checkShowName({ authorId, prevAuthorId, date, prevDate }: IMessage, room: IRoom) {
	const { id } = useCurrentMember()
	const isPrivate = $isPrivate(room)
	const isSelf = $isAuthor(authorId, id)
	if (isSelf || isPrivate) return false

	const isDifferentAuthor = authorId !== prevAuthorId
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

export function getSystemText(message?: IMessage) {
	if (!message) return ''
	return message.content.find((c): c is IMessageText => c.type === 'text')?.value
}

export function getJoined(message?: IMessage) {
	if (!message) return ''
	return message.content.find((c): c is IJoined => c.type === 'joined')?.value.memberId
}

export function getGreeting(message?: IMessage) {
	if (!message) return ''
	return message.content.find((c): c is IGreeting => c.type === 'greeting')?.value.text
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

export function createPartnerRequestMessage(roomId: string, authorId: string, memberId: string, result = 'pending') {
	return {
		roomId,
		type: 'system',
		authorId,
		content: [{ type: 'partnerRequest', value: { from: authorId, to: memberId, result } }]
	}
}
