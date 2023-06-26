export function isAuthor(uid: string) {
	return uid === 'me'
}

export function isAdmin(memberUid: string, roomUid?: string) {
	if (!roomUid) return false
	return equals.any(memberUid, ['me', '1']) && roomUid === 'public'
}
