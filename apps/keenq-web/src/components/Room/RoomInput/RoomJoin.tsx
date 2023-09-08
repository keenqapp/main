import Button from '@mui/material/Button'

import { useTranslate } from '@/services/translate'

import { useCurrentMember } from '@/model/member'
import { useCurrentRoom } from '@/model/room'
import { insertjoinroom, updatejoinroom } from '@/model/rooms_members'

import { useInsert, useMutation } from '@/hooks/gql'


function RoomJoin() {
	const { t } = useTranslate()
	const { id: mid } = useCurrentMember()
	const { id: rid, isSoftDeleted } = useCurrentRoom()

	const [ , insertJoin ] = useInsert(insertjoinroom)
	const [ , updateJoin ] = useMutation(updatejoinroom)

	const onJoinClick = () => {
		if (isSoftDeleted) updateJoin({ memberId: mid, roomId: rid })
		else insertJoin({ memberId: mid, roomId: rid, privateFor: rid })
	}

	return (
		<Button onClick={onJoinClick} fullWidth>{t`room.join`}</Button>
	)
}

export default RoomJoin
