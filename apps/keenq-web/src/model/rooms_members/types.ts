import { IRoom } from '@/model/room'


export interface IRoomMember {
	id: bigint
	roomId: string
	memberId: string
	role: string
	privateFor?: string
	room?: IRoom
	deletedAt?: Date | null
}
