import { parseISO } from 'date-fns'

import Typography from '@mui/material/Typography'

import { shouldShowCheck } from '@/components/Room/RoomMessage/utils'

import { IMessage } from '@/types/messages'
import { formatDate } from '@/utils/formatters'


function RoomMessageTime(message: IMessage) {
	const shouldShow = shouldShowCheck(message)
	if (!shouldShow) return null
	return (
		<Typography variant='caption'>{formatDate(parseISO(message.date), { to: 'HH:mm' })}</Typography>
	)
}

export default RoomMessageTime
