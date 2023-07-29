import { useCurrentMember } from '@/model/member/hooks'
import { IMember } from '@/model/member/types'


export function $isAuthor(aid: string, mid: string) {
	return aid === mid
}

export function useIsAuthor(aid: string) {
	const { id } = useCurrentMember()
	return $isAuthor(aid, id)
}

export function $isAdmin(id: string|null, adminsIds?: string[]) {
	if (!id || !adminsIds) return false
	return equals.any(id, adminsIds)
}

export function getPartner(linked: IMember['linked']) {
	return linked?.find(({ type }) => type === 'partner')?.value
}

export function getAvatar(member: IMember) {
	return member?.images?.[0]
}
