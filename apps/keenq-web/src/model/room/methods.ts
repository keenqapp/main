import { rooms } from '@/components/Rooms/rooms.mock'

import { IRoom } from '@/model/room/types'


export function getRoomById(uid: string) {
	return rooms.find(room => room.uid === uid)! as IRoom
}

export function $isPrivate(room?: IRoom) {
	if (!room) return false
	return equals(room.type, 'private')
}

export function $isPersonal(room?: IRoom) {
	if (!room) return false
	return equals(room.type, 'personal')
}

export function $isPublic(room?: IRoom) {
	if (!room) return false
	return equals(room.type, 'public')
}

export function $isChannel(room?: IRoom) {
	if (!room) return false
	return equals(room.type, 'channel')
}
