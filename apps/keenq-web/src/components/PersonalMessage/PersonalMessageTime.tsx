import styled from '@emotion/styled'

import Typography from '@mui/material/Typography'

import { IMessage, shouldShowCheck } from '@/model/message'

import { formatDate } from '@/utils/formatters'


const Time = styled(Typography)`
	padding-bottom: 1rem !important;
`

function PersonalMessageTime(message: IMessage) {
	const shouldShow = shouldShowCheck(message)
	if (!shouldShow) return null
	return (
		<Time variant='caption' data-testid='test'>{formatDate(message.date, { to: 'HH:mm' })}</Time>
	)
}

export default PersonalMessageTime
