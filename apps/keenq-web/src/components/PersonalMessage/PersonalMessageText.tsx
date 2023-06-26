import styled from '@emotion/styled'
import { useParams } from 'react-router-dom'

import Typography from '@mui/material/Typography'

import Row from '@/ui/Row'

import { isAdmin, isAuthor } from '@/model/member'
import { checkShowName, getText, IMessage } from '@/model/message'
import { toColor } from '@/model/message'
import { isPrivateRoom } from '@/model/room'


const MessageContainerContent = styled(Row)`
  padding: 0.5rem 1rem;
  box-shadow: 1px 3px 4px rgba(0,0,0,0.07);
`
const Text = styled(Typography)`
	white-space: pre-wrap;
`

function PersonalMessageText(message: IMessage) {
	const { authorUid, author: { name } } = message
	const text = getText(message)

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
			data-testid='PersonalMessageText'
			className='PersonalMessageText'
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

export default PersonalMessageText
