import { IMember } from '@/model/member/types'
import { $isPersonal, IRoom } from '@/model/room'


export function $isAuthor(id: string) {
	return id === 'me'
}

export function $isAdmin(id: string|null, room?: IRoom) {
	return true
	if (!id && !room) return false
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return !$isPersonal(room) && equals.any(id, room.adminsIds)
}

export function getPartner(linked: IMember['linked']) {
	return linked?.find(({ type }) => type === 'partner')?.value
}
