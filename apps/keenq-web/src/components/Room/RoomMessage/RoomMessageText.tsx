import styled from '@emotion/styled'
import { useParams } from 'react-router-dom'

import Typography from '@mui/material/Typography'

import Row from '@/ui/Row'

import { isAuthorCurrent, isPrivateRoom, shouldShowCheck, toColor } from '@/components/Room/RoomMessage/utils'

import { IMessage } from '@/types/messages'


const MessageContainerContent = styled(Row)`
  padding: 0.5rem 1rem;
  box-shadow: 1px 3px 4px rgba(0,0,0,0.07);
`
const Text = styled(Typography)`
	white-space: pre-wrap;
`

function RoomMessageText(message: IMessage) {
	const { text, authorUid, author: { name } } = message

	const preventSelection = (e: MouseEvent) => e.preventDefault()

	const { uid } = useParams()

	const isSelf = isAuthorCurrent(authorUid)
	const isPrivate = isPrivateRoom(uid!)
	const shouldShow = shouldShowCheck(message)

	if (isSelf && !text) return null

	return (
		<MessageContainerContent
			data-testid='RoomMessageText'
			className='RoomMessageText'
			class='test'
			direction='column'
			align='start'
			gap={0.5}
			onMouseDown={preventSelection}
			onTouchStart={preventSelection}
			onSelectStart={preventSelection}
			wrap
		>
			{!isSelf && isPrivate && shouldShow ? <Typography color={toColor(name)} fontWeight={600}>{name}</Typography> : null}
			{text ? <Text>{text}</Text> : null}
		</MessageContainerContent>
	)
}

export default RoomMessageText
