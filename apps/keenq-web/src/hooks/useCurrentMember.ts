import { useParams } from 'react-router-dom'

import { IMember, isAdmin } from '@/model/member'


export function useCurrentMember() {
	const { uid: ruid } = useParams()
	const admin = isAdmin('me', ruid)

	return {
		uid: 'me',
		name: 'boris',
		image: '',
		admin,
	} as IMember
}
