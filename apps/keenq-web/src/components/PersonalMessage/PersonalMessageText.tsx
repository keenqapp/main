import styled from '@emotion/styled'

import { Link } from '@mui/material'
import Typography from '@mui/material/Typography'

import { useTranslate } from '@/services/translate'

import { useIsAuthor } from '@/model/member'
import { checkShowName, getText, IMessage } from '@/model/message'
import { toColor } from '@/model/message'
import { useCurrentRoom } from '@/model/room'

import Stack from '@/ui/Stack'
import theme from '@/ui/theme'

import { useIsAdmin } from '@/hooks/useIsAdmin'
import { parseStringForUrls } from '@/utils/formatters'


const MessageContainerContent = styled(Stack)`
  padding: 0.5rem 1rem;
  box-shadow: ${theme.boxShadow};
`
const Text = styled(Typography)`
	white-space: pre-wrap;
`

function https(url: string) {
	if (url.startsWith('http://')) return url.replace('http://', 'https://')
	if (url.startsWith('https://')) return url
	return `https://${url}`
}

function Parts({ text, mid }: { text: string, mid: string }) {
	const parts = parseStringForUrls(text)
	const result = parts.map((part, index) => {
		if (part.type === 'text') return part.value
		if (part.type === 'link') return (
			<Link
				key={`${part.value}_${index}_${mid}`}
				href={https(part.value)}
				rel='noreferrer noopener'
				color='secondary'
				target='_blank'
				underline={'none'}
			>{part.value.replace(/^http(s)?:\/\//, '')}</Link>
		)
	})
	return (
		<Text>
			{result}
		</Text>
	)
}

function PersonalMessageText(message: IMessage) {
	const { t } = useTranslate()
	const { id, authorId, author: { name: mname } } = message
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
					<Stack>
						<Typography color={toColor(name)} fontWeight={600}>{name}</Typography>
						{isAdmin && !isChannel && <Typography variant='caption'>{t`roomsMembers.admin`}</Typography>}
					</Stack>
				)
				: null}
			{text ? <Parts text={text} mid={id} /> : null}
		</MessageContainerContent>
	)
}

export default PersonalMessageText
