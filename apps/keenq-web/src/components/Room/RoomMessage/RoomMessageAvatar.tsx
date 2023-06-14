import styled from '@emotion/styled'
import { useParams } from 'react-router-dom'

import { Avatar } from '@mui/material'

import { isAuthorCurrent, isPrivateRoom, shouldShowCheck } from '@/components/Room/RoomMessage/utils'

import { IMessage } from '@/types/messages'


const StyledAvatar = styled(Avatar)`
	margin-bottom: 1.2rem;
`

const EmptyAvatar = styled.div`
	width: 40px;
	height: 40px;
	flex: 0 0 40px;
`

function RoomMessageAvatar(message: IMessage) {
	const { authorUid, author: { image } } = message
	const { uid } = useParams()

	const shouldShow = shouldShowCheck(message)
	const isSelf = isAuthorCurrent(authorUid)
	const isPrivate = isPrivateRoom(uid!)

	if (isSelf || !isPrivate) return null
	if (!shouldShow) return <EmptyAvatar />

	return (
		<StyledAvatar data-testid='RoomMessageAvatar' src={image} />
	)
}

export default RoomMessageAvatar
