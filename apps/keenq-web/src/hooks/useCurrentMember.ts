import { useStore } from '@nanostores/preact'
import { useParams } from 'react-router-dom'

import { $uid } from '@/services/auth'

import { useQuery } from '@/hooks/gql'
import { $isAdmin, currentgql, IMember } from '@/model/member'
import { getRoomById } from '@/model/room'


export function useCurrentMember() {
	const uid = useStore($uid)
	const [ { data } ] = useQuery(currentgql, { uid })
	const member = data?.members_by_pk
	const { uid: ruid } = useParams<{ uid: string }>()
	const room = getRoomById(ruid!)
	const admin = $isAdmin(uid, room)

	return {
		...member,
		isAdmin: admin,
	} as unknown as IMember
}
