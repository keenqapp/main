import { $isAdmin, $isOwner } from '@/model/member'
import { useCurrentRoom } from '@/model/room'


export function useIsAdmin(mid: string) {
	const { adminsIds } = useCurrentRoom()
	return $isAdmin(mid, adminsIds)
}

export function useIsOwner(mid: string) {
	const { admins } = useCurrentRoom()
	return $isOwner(mid, admins)
}
