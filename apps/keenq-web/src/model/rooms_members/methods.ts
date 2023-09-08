import { IRoomMember } from '@/model/rooms_members/types'


export function $isBanned(memberId: string, roomsMembers: IRoomMember[]) {
	return roomsMembers.some(rm => rm.memberId === memberId && rm.role === 'banned')
}
