import { useMemo } from 'preact/hooks'
import { useParams } from 'react-router-dom'

import { useQuery } from '@/hooks/gql'
import { useCurrentMember } from '@/model/member/hooks'
import { currentroomgql } from '@/model/room/gql'
import { IRoom } from '@/model/room/types'
import { IRoomMember } from '@/model/rooms_members'


const options = {
	requestPolicy: 'cache-and-network',
} as const

export interface IUseCurrentRoom {
	room: IRoom
	isMember: boolean
	isAdmin: boolean
	membersCount: number
	members: IRoomMember[]
	membersIds: string[]
	admins: IRoomMember[]
	adminsIds: string[]
	isChannel: boolean
	isPrivate: boolean
}

export function useCurrentRoom() {
	const { id } = useParams()
	const { id: mid } = useCurrentMember()
	const [ result ] = useQuery(currentroomgql, { id }, options)

	const data = useMemo(() => {
		const room = result.data?.rooms_by_pk || {} as IRoom
		const membersCount = result.data?.rooms_members_aggregate.aggregate.count
		const members = result.data?.rooms_members || []
		const membersIds = result.data?.rooms_members.map((rm: any) => rm.memberId)
		const admins = result.data?.rooms_admins || []
		const adminsIds = result.data?.rooms_admins.map((rm: any) => rm.memberId)
		const isMember = membersIds?.includes(mid)
		const isAdmin = adminsIds?.includes(mid)
		const isChannel = equals(room.type, 'channel')
		const isPrivate = equals(room.type, 'private')

		return {
			room,
			isMember,
			isAdmin,
			membersCount,
			members,
			membersIds,
			admins,
			adminsIds,
			isChannel,
			isPrivate
		}
	}, [ result.data ])

	return data as IUseCurrentRoom
}
