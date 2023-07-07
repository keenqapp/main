import styled from '@emotion/styled'
import { useParams } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'

import { $isAuthor } from '@/model/member'
import { IMessage, shouldShowCheck } from '@/model/message'
import { $isPrivate } from '@/model/room'


const StyledAvatar = styled(Avatar)`
	margin-bottom: 1.2rem;
`

const EmptyAvatar = styled.div`
	width: 40px;
	height: 40px;
	flex: 0 0 40px;
`

function PersonalMessageAvatar(message: IMessage) {
	const { authorId, author: { image } } = message
	const { id } = useParams()

	const shouldShow = shouldShowCheck(message)
	const isSelf = $isAuthor(authorId)
	const isPrivate = $isPrivate(id!)

	if (isSelf || isPrivate) return null
	if (!shouldShow) return <EmptyAvatar />

	return (
		<StyledAvatar data-testid='PersonalMessageAvatar' src={image} />
	)
}

export default PersonalMessageAvatar
