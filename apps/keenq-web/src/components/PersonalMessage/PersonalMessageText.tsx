import styled from '@emotion/styled'

import { Link } from '@mui/material'
import Typography from '@mui/material/Typography'

import { useIsAuthor } from '@/model/member'
import { getText, IMessage } from '@/model/message'
import { useCurrentRoom } from '@/model/room'

import Stack from '@/ui/Stack'
import theme from '@/ui/theme'

import { parseStringForUrls } from '@/utils/formatters'


const MessageContainerContent = styled(Stack)`
  padding: 0 1rem;
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
	const { id, authorId } = message
	const text = getText(message)

	const { isPrivate } = useCurrentRoom()
	const isSelf = useIsAuthor(authorId)

	if ((isSelf || isPrivate) && !text) return null
	if (!text) return null

	return (
		<MessageContainerContent
			data-testid='PersonalMessageText'
			direction='column'
			align='start'
			gap={0.5}
			// onMouseDown={preventSelection}
			// onSelectStart={preventSelection}
			wrap
		>
			{text ? <Parts text={text} mid={id} /> : null}
		</MessageContainerContent>
	)
}

export default PersonalMessageText
