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
	id: string
	room: IRoom
	isMember: boolean
	isAdmin: boolean
	isOwner: boolean
	membersCount: number
	members: IRoomMember[]
	membersIds: string[]
	admins: IRoomMember[]
	adminsIds: string[]
	isChannel: boolean
	isPrivate: boolean
	isPersonal: boolean
}

export function useCurrentRoom() {
	const { id } = useParams()
	const { id: mid } = useCurrentMember()
	const [ result ] = useQuery(currentroomgql, { id }, options)

	const data = useMemo(() => {
		const room = result.data?.rooms_by_pk || {} as IRoom
		const membersCount = result.data?.rooms_members_aggregate.aggregate.count
		const members = result.data?.rooms_members || []
		const membersIds = result.data?.rooms_members.map(rm => rm.memberId)
		const admins = result.data?.rooms_admins || []
		const adminsIds = result.data?.rooms_admins.map(rm => rm.memberId)
		const isMember = membersIds?.includes(mid)
		const isAdmin = adminsIds?.includes(mid)
		const isOwner = !!result.data?.rooms_admins.find(rm => rm.memberId === mid && rm.role === 'owner')
		const isChannel = equals(room.type, 'channel')
		const isPrivate = equals(room.type, 'private')
		const isPersonal = equals(room.type, 'personal')

		return {
			id,
			room,
			isMember,
			isAdmin,
			isOwner,
			membersCount,
			members,
			membersIds,
			admins,
			adminsIds,
			isChannel,
			isPrivate,
			isPersonal
		}
	}, [ result.data ])

	return data as IUseCurrentRoom
}
