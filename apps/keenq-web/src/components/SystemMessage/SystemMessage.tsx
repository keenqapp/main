import styled from '@emotion/styled'

import { getGreeting, getJoined, getPartnerRequest, getSystemText, IMessage } from '@/model/message'

import Stack from '@/ui/Stack'

import PartnerRequest from '@/components/SystemMessage/PartnerRequest'
import SystemGreeting from '@/components/SystemMessage/SystemGreeting'
import SystemJoinedMessage from '@/components/SystemMessage/SystemJoinedMessage'
import SystemTextMessage from '@/components/SystemMessage/SystemTextMessage'


const SystemMessageContainer = styled(Stack)`
	padding: 0 2rem 1rem;
	display: flex;
	flex-direction: column;
`

function SystemMessage(message: IMessage) {
	const request = getPartnerRequest(message)
	const text = getSystemText(message)
	const greeting = getGreeting(message)
	const joined = getJoined(message)
	return (
		<SystemMessageContainer data-testid='SystemMessage' aling='center'>
			{request && <PartnerRequest id={message.id} {...request} />}
			{text && <SystemTextMessage value={text} />}
			{joined && <SystemJoinedMessage joined={joined} />}
			{greeting && <SystemGreeting message={message} />}
		</SystemMessageContainer>
	)
}

export default SystemMessage
