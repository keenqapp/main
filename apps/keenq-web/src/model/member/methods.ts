import { useCurrentMember } from '@/model/member/hooks'
import { IMember } from '@/model/member/types'
import { $isPersonal, IRoom } from '@/model/room'


export function $isAuthor(aid: string, mid: string) {
	return aid === mid
}

export function useIsAuthor(aid: string) {
	const { id } = useCurrentMember()
	return $isAuthor(aid, id)
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

export function getAvatar(member: IMember) {
	return member?.images?.[0]
}
