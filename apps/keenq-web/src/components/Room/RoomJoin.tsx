import Button from '@mui/material/Button'

import { useTranslate } from '@/services/translate'

import { useCurrentMember } from '@/model/member'
import { useCurrentRoom } from '@/model/room'
import { insertjoinroom, updatejoinroom } from '@/model/rooms_members'
import ChevronLeftTwoToneIcon from '@mui/icons-material/ChevronLeftTwoTone'

import { useInsert, useMutation } from '@/hooks/gql'
import { useNavigate } from 'react-router-dom'


function RoomJoin() {
	const navigate = useNavigate()
	const { t } = useTranslate()
	const { id: mid, done } = useCurrentMember()
	const { id: rid, isSoftDeleted } = useCurrentRoom()

	const [ , insertJoin ] = useInsert(insertjoinroom)
	const [ , updateJoin ] = useMutation(updatejoinroom)

	const onJoinClick = () => {
		if (isSoftDeleted) updateJoin({ memberId: mid, roomId: rid })
		else insertJoin({ memberId: mid, roomId: rid, privateFor: rid })
	}

	if (!done) return <Button onClick={() => navigate('/profile')} fullWidth endIcon={<ChevronLeftTwoToneIcon />}>{t`room.fill`}</Button>

	return (
		<Button onClick={onJoinClick} fullWidth>{t`room.join`}</Button>
	)
}

export default RoomJoin
