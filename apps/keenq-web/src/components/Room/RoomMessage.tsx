import PersonalMessage from '@/components/PersonalMessage'
import SystemMessage from '@/components/SystemMessage'

import { IMessage } from '@/model/message'


function RoomMessage(message: IMessage) {
	if (message.type === 'personal' || message.type === 'greeting') return PersonalMessage(message)
	if (message.type === 'system') return SystemMessage(message)
	return null
}

export default RoomMessage
