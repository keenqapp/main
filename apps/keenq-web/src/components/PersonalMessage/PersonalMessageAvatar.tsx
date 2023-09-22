import styled from '@emotion/styled'

import Avatar from '@mui/material/Avatar'

import { $isAuthor, useCurrentMember } from '@/model/member'
import { IMessage, shouldShowCheck } from '@/model/message'
import { $isChannel, $isPrivate, useCurrentRoom } from '@/model/room'


const StyledAvatar = styled(Avatar)`
	margin-bottom: 1.2rem;
`

const EmptyAvatar = styled.div`
	width: 40px;
	height: 40px;
	flex: 0 0 40px;
`

function PersonalMessageAvatar(message: IMessage) {
	const { authorId, author: { images, name } } = message
	const { room } = useCurrentRoom()
	const { id } = useCurrentMember()

	const shouldShow = shouldShowCheck(message)
	const isSelf = $isAuthor(authorId, id)
	const isPrivate = $isPrivate(room)
	const isChannel = $isChannel(room)

	if (isSelf || isPrivate || isChannel) return null
	if (!shouldShow) return <EmptyAvatar />

	return (
		<StyledAvatar data-testid='PersonalMessageAvatar' src={images?.[0]?.url} alt={name}  />
	)
}

export default PersonalMessageAvatar
