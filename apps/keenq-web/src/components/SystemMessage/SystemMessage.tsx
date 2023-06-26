import styled from '@emotion/styled'

import Column from '@/ui/Column'

import PartnerRequest from '@/components/SystemMessage/PartnerRequest'
import SystemTextMessage from '@/components/SystemMessage/SystemTextMessage'

import { getPartnerRequest, getText, IMessage } from '@/model/message'


const SystemMessageContainer = styled(Column)`
	padding: 0 2rem;
`

function SystemMessage(message: IMessage) {
	const request = getPartnerRequest(message)
	const text = getText(message)
	return (
		<SystemMessageContainer data-testid='SystemMessage' aling='center'>
			{request && <PartnerRequest {...request} />}
			{text && <SystemTextMessage text={text} />}
		</SystemMessageContainer>
	)
}

export default SystemMessage
