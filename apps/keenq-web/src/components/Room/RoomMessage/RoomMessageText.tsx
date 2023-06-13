import styled from '@emotion/styled'

import Typography from '@mui/material/Typography'

import Row from '@/ui/Row'

import { IMessage } from '@/components/Room/RoomMessages'


const MessageContainerContent = styled(Row)`
  padding: 1rem;
  box-shadow: 1px 3px 4px rgba(0,0,0,0.07);
`
const Text = styled(Typography)`
	white-space: pre-wrap;
`

function RoomMessageText({ text }: IMessage) {
	if (!text) return null
	return (
		<MessageContainerContent
			data-testid='RoomMessageText'
			className='RoomMessageText'
			class='test'
			direction='column'
			align='start'
			gap={0.5}
			wrap
		>
			<Text>{text}</Text>
		</MessageContainerContent>
	)
}

export default RoomMessageText
