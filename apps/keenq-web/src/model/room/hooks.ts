import { useMemo } from 'preact/hooks'
import { useParams } from 'react-router-dom'

import { useCurrentMember } from '@/model/member/hooks'
import { currentroomgql } from '@/model/room/gql'
import { IRoom } from '@/model/room/types'
import { IRoomMember } from '@/model/rooms_members'

import { useQuery } from '@/hooks/gql'


const options = {
	requestPolicy: 'cache-and-network',
} as const

export interface IUseCurrentRoom {
	id: string
	room: IRoom
	isMember: boolean
	isSoftDeleted: boolean
	isAdmin: boolean
	isOwner: boolean
	isBanned: boolean
	allMembers: IRoomMember[]
	allMembersIds: string[]
	members: IRoomMember[]
	membersIds: string[]
	admins: IRoomMember[]
	adminsIds: string[]
	membersCount: number
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

		const allMembers = result.data?.rooms_members || []
		const allMembersIds = allMembers.map(rm => rm.memberId)

		const members = result.data?.rooms_members_excluded || []
		const membersCount = members.length

		const membersIds = members.map(rm => rm.memberId)
		const admins = result.data?.rooms_admins || []
		const adminsIds = result.data?.rooms_admins.map(rm => rm.memberId)

		const _member = allMembers.find(rm => rm.memberId === mid)

		const isMember = _member && _member.deletedAt === null
		const isSoftDeleted = _member && !!_member.deletedAt
		const isBanned = _member && _member.role === 'banned'
		const isAdmin = _member && equals.any(_member.role, ['admin', 'owner'])
		const isOwner = _member && _member.role === 'owner'

		const isChannel = equals(room.type, 'channel')
		const isPrivate = equals(room.type, 'private')
		const isPersonal = equals(room.type, 'personal')

		return {
			id,
			room,
			isMember,
			isSoftDeleted,
			isAdmin,
			isOwner,
			isBanned,
			membersCount,
			allMembers,
			allMembersIds,
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
