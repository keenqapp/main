import styled from '@emotion/styled'

import Typography from '@mui/material/Typography'

import { useTranslate } from '@/services/translate'

import { useIsAuthor } from '@/model/member'
import { checkShowName, getText, IMessage } from '@/model/message'
import { toColor } from '@/model/message'
import { useCurrentRoom } from '@/model/room'

import Row from '@/ui/Row'
import theme from '@/ui/theme'

import { useIsAdmin } from '@/hooks/useIsAdmin'


const MessageContainerContent = styled(Row)`
  padding: 0.5rem 1rem;
  box-shadow: ${theme.boxShadow};
`
const Text = styled(Typography)`
	white-space: pre-wrap;
`

function PersonalMessageText(message: IMessage) {
	const { t } = useTranslate()
	const { authorId, author: { name: mname } } = message
	const text = getText(message)

	const preventSelection = (e: MouseEvent) => e.preventDefault()

	const { room, isChannel, isPrivate } = useCurrentRoom()
	const isAdmin = useIsAdmin(authorId)
	const isSelf = useIsAuthor(authorId)
	const shouldShowName = checkShowName(message, room)
	const name = isChannel ? room.name : mname

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
						{isAdmin && !isChannel && <Typography variant='caption'>{t`roomsMembers.admin`}</Typography>}
					</Row>
				)
				: null}
			{text ? <Text>{text}</Text> : null}
		</MessageContainerContent>
	)
}

export default PersonalMessageText
