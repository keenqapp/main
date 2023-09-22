import styled from '@emotion/styled'
import { parseISO } from 'date-fns'

import Typography from '@mui/material/Typography'

import Stack from '@/ui/Stack'

import { getImage, getReply, getText, IMessage } from '@/model/message'
import { toColor } from '@/model/message'
import { formatDate } from '@/utils/formatters'


const Image = styled.img`
	width: 40px;
	height: 40px;
	object-fit: cover;
	border-radius: 8px !important;
`

const ReplyContainer = styled.div`
  border-left: 2px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.3rem;
  background: rgb(244,244,244);
	opacity: 0.9;
  align-self: flex-start;
`

const TextContainer = styled(Stack)`
	padding: 0.1rem 0;
`

const Text = styled(Typography)`
	max-width: 33vw;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	align-items: flex-start;
	padding: 0 !important;
	line-height: 1rem;
`

function PersonalMessageReply(message: IMessage) {
	const reply = getReply(message)
	if (!reply) return null

	const { date, author: { name } } = reply
	const image = getImage(reply)
	const text = getText(reply)

	return (
		<ReplyContainer data-testid='PersonalMessageReply'>
			<Stack gap={1} align='stretch'>
				{image && <Image src={image.url} />}
				<TextContainer direction='column' align='start' justify='between'>
					<Typography variant='body2' color={toColor(name)} fontWeight={600}>{name}</Typography>
					<Text variant={text ? 'body2' : 'caption'} color='text.secondary'>{text ? text : formatDate(parseISO(date), { to: 'HH:mm' })}</Text>
				</TextContainer>
			</Stack>
		</ReplyContainer>
	)
}

export default PersonalMessageReply
