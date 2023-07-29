import { $isAdmin } from '@/model/member'
import { useCurrentRoom } from '@/model/room'


export function useIsAdmin(mid: string) {
	const { adminsIds } = useCurrentRoom()
	return $isAdmin(mid, adminsIds)
}
