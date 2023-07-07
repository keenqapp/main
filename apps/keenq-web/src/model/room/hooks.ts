import { useMemo } from 'preact/hooks'
import { useParams } from 'react-router-dom'

import { useQuery } from '@/hooks/gql'
import { useCurrentMember } from '@/model/member/hooks'
import { currentroomgql } from '@/model/room/gql'
import { IRoom } from '@/model/room/types'


const options = {
	requestPolicy: 'cache-and-network',
} as const

export interface IUseCurrentRoom {
	room: IRoom
	isMember: boolean
	isAdmin: boolean
	membersCount: number
	membersIds: string[]
	adminsIds: string[]
}

export function useCurrentRoom() {
	const { id } = useParams()
	const { id: mid } = useCurrentMember()
	const [ result ] = useQuery(currentroomgql, { id }, options)

	console.log('--- hooks.ts:28 -> useCurrentRoom ->', result.data)

	const data = useMemo(() => {
		const room = result.data?.rooms_by_pk || {}
		const membersCount = result.data?.rooms_members_aggregate.aggregate.count
		const membersIds = result.data?.rooms_members.map((rm: any) => rm.memberId)
		const adminsIds = result.data?.rooms_admins.map((rm: any) => rm.memberId)
		const isMember = membersIds?.includes(mid)
		const isAdmin = adminsIds?.includes(mid)
		return {
			room,
			isMember,
			isAdmin,
			membersCount,
			membersIds,
			adminsIds
		}
	}, [ result.data ])

	return data as IUseCurrentRoom
}
