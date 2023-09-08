import Typography from '@mui/material/Typography'

import { IMessage, shouldShowCheck } from '@/model/message'

import { formatDate } from '@/utils/formatters'


function PersonalMessageTime(message: IMessage) {
	const shouldShow = shouldShowCheck(message)
	if (!shouldShow) return null
	return (
		<Typography variant='caption'>{formatDate(message.date, { to: 'HH:mm' })}</Typography>
	)
}

export default PersonalMessageTime
