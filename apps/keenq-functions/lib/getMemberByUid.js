export default async function getMemberByUid(uid, db) {
	try {
		return await db
			.table('credentials')
			.select()
			.where('uid', uid)
			.where('deletedAt', null)
			// TODO: Where clause for NOT banned
			.first()
	}
	catch(e) {
		throw { error: e }
	}
}
