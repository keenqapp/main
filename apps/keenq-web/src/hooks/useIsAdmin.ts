import { useParams } from 'react-router-dom'

import { $isAdmin } from '@/model/member'
import { getRoomById } from '@/model/room'


export function useIsAdmin(muid: string) {
	const { uid: ruid } = useParams()
	if (!ruid) return false
	const room = getRoomById(ruid)
	return $isAdmin(muid, room)
}
