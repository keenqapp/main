import styled from '@emotion/styled'

import Typography from '@mui/material/Typography'

import Row from '@/ui/Row'

import { toColor } from '@/components/Room/RoomMessage/utils'

import { IMessage, IMessageImage, IMessageReply, IMessageText } from '@/types/messages'
import { formatDate } from '@/utils/formatters'
import { parseISO } from 'date-fns'


const Image = styled.img`
	width: 3rem;
	height: 3rem;
	object-fit: cover;
	border-radius: 0.5rem;
`

const ReplyContainer = styled.div`
  border-left: 2px solid #ccc;
  border-radius: 0.5rem;
  padding: 0.3rem;
  background: rgb(244,244,244);
	opacity: 0.9;
  align-self: flex-start;
`

const TextContainer = styled(Row)`
	padding: 0.2rem 0;
`

const Text = styled(Typography)`
	max-width: 33vw;
	text-overflow: ellipsis;
	overflow: hidden;
	white-space: nowrap;
	align-items: flex-start;
`

function RoomMessageReply({ content }: IMessage) {
	const reply = content?.find((c): c is IMessageReply => c.type === 'reply')
	if (!reply) return null

	const { content: replyContent, date, author: { name } } = reply.value
	const image = replyContent.find((c): c is IMessageImage => c.type === 'image')
	const text = replyContent.find((c): c is IMessageText => c.type === 'text')

	return (
		<ReplyContainer data-testid='RoomMessageReply'>
			<Row gap={1} align='stretch'>
				{image && <Image src={image.value.url} />}
				<TextContainer direction='column' align='start' justify='between'>
					<Typography variant='body2' color={toColor(name)} fontWeight={600}>{name}</Typography>
					<Text variant='body2' color='text.secondary'>{text ? text.value.text : formatDate(parseISO(date), { to: 'HH:mm' })}</Text>
				</TextContainer>
			</Row>
		</ReplyContainer>
	)
}

export default RoomMessageReply
