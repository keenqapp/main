import { $isPersonal, IRoom } from '@/model/room'


export function $isAuthor(uid: string) {
	return uid === 'me'
}

export function $isAdmin(uid: string, room?: IRoom) {
	return true
	if (!room) return false
	return !$isPersonal(room) && equals.any(uid, room.adminsUids)
}

export function $isRoomMember(room: IRoom, uid: string) {
	if (!room) return false
	return equals.any(uid, room.membersUids)
}
