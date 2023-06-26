import { useParams } from 'react-router-dom'

import { isAdmin } from '@/model/member'


export function useIsAdmin(muid: string) {
	const { uid: ruid } = useParams()
	if (!ruid) return false
	return isAdmin(muid, ruid)
}
