import { useParams } from 'react-router-dom'

import { $isAdmin } from '@/model/member'
import { getRoomById } from '@/model/room'


export function useIsAdmin(mid: string) {
	const { id: rid } = useParams()
	if (!rid) return false
	const room = getRoomById(rid)
	return $isAdmin(mid, room)
}
