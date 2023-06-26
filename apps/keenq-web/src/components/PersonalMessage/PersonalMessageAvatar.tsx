import styled from '@emotion/styled'
import { useParams } from 'react-router-dom'

import { Avatar } from '@mui/material'

import { isAuthor } from '@/model/member'
import { IMessage, shouldShowCheck } from '@/model/message'
import { isPrivateRoom } from '@/model/room'


const StyledAvatar = styled(Avatar)`
	margin-bottom: 1.2rem;
`

const EmptyAvatar = styled.div`
	width: 40px;
	height: 40px;
	flex: 0 0 40px;
`

function PersonalMessageAvatar(message: IMessage) {
	const { authorUid, author: { image } } = message
	const { uid } = useParams()

	const shouldShow = shouldShowCheck(message)
	const isSelf = isAuthor(authorUid)
	const isPrivate = isPrivateRoom(uid!)

	if (isSelf || isPrivate) return null
	if (!shouldShow) return <EmptyAvatar />

	return (
		<StyledAvatar data-testid='PersonalMessageAvatar' src={image} />
	)
}

export default PersonalMessageAvatar
