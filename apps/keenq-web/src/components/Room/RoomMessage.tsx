import { IMessage } from '@/model/message'

import PersonalMessage from '@/components/PersonalMessage'
import SystemMessage from '@/components/SystemMessage'


function RoomMessage(message: IMessage) {
	if (message.type === 'personal') return PersonalMessage(message)
	if (message.type === 'system') return SystemMessage(message)
	return null
}

export default RoomMessage
