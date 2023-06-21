import styled from '@emotion/styled'
import { differenceInMinutes, isSameDay, parseISO } from 'date-fns'
import { useParams } from 'react-router-dom'

import Typography from '@mui/material/Typography'

import Row from '@/ui/Row'

import { isAdmin, isAuthor, isPrivateRoom, toColor } from '@/components/Room/RoomMessage/utils'

import { IMessage, IMessageText } from '@/types/messages'


const MessageContainerContent = styled(Row)`
  padding: 0.5rem 1rem;
  box-shadow: 1px 3px 4px rgba(0,0,0,0.07);
`
const Text = styled(Typography)`
	white-space: pre-wrap;
`

const MAX_DIFF_IN_MINUTES = 2
function checkShowName({ authorUid, prevAuthorUid, date, prevDate }: IMessage, ruid: string) {
	const isPrivate = isPrivateRoom(ruid!)
	const isSelf = isAuthor(authorUid)
	if (isSelf || isPrivate) return false

	const isDifferentAuthor = authorUid !== prevAuthorUid
	if (isDifferentAuthor) return true
	if (!prevDate) return true

	const current = parseISO(date)
	const prev = parseISO(prevDate)
	const diff = differenceInMinutes(current, prev)
	if (!isSameDay(current, prev)) return true
	return diff > MAX_DIFF_IN_MINUTES
}

function RoomMessageText(message: IMessage) {
	const { content, authorUid, author: { name } } = message
	const textContent = content?.find((c): c is IMessageText => c.type === 'text')

	const { text } = textContent?.value || {}
	const preventSelection = (e: MouseEvent) => e.preventDefault()

	const { uid: ruid } = useParams()

	const isSelf = isAuthor(authorUid)
	const isPrivate = isPrivateRoom(ruid!)
	const shouldShowName = checkShowName(message, ruid!)
	const admin = isAdmin(authorUid, ruid!)

	if ((isSelf || isPrivate) && !text) return null
	if (!text && !shouldShowName) return null

	return (
		<MessageContainerContent
			data-testid='RoomMessageText'
			className='RoomMessageText'
			class='test'
			direction='column'
			align='start'
			gap={0.5}
			onMouseDown={preventSelection}
			onSelectStart={preventSelection}
			wrap
		>
			{shouldShowName
				? (
					<Row>
						<Typography color={toColor(name)} fontWeight={600}>{name}</Typography>
						{admin && <Typography variant='caption'>admin</Typography>}
					</Row>
				)
				: null}
			{text ? <Text>{text}</Text> : null}
		</MessageContainerContent>
	)
}

export default RoomMessageText
