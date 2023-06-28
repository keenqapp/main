import { useParams } from 'react-router-dom'

import { $isAdmin, IMember } from '@/model/member'
import { getRoomById } from '@/model/room'


export function useCurrentMember() {
	const { uid: ruid } = useParams()
	const room = getRoomById(ruid!)
	const admin = $isAdmin('me', room)

	return {
		uid: 'me',
		name: '',
		image: '',
		setupDone: false,
		description: '',
		admin,
	} as unknown as IMember
}
