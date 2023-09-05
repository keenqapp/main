import styled from '@emotion/styled'
import { parseISO } from 'date-fns'

import Typography from '@mui/material/Typography'

import { getGreeting, IMessage } from '@/model/message'

import Space from '@/ui/Space'
import theme from '@/ui/theme'

import { formatDate } from '@/utils/formatters'
import { useTranslate } from '@/services/translate'


const SystemTextMessageContainer = styled.div`
	text-align: center;
	align-self: flex-start;
	padding: 0.2rem 1rem;
  border-radius: 1rem 1rem 1rem 0;
  background: ${theme.color.secondaryVeryLight};
`

function SystemGreeting({ message }: { message: IMessage }) {
	const { t } = useTranslate()
	const greeting = getGreeting(message)
	return (
		<>
			<SystemTextMessageContainer data-testid='SystemGreeting'>
				<Typography variant='overline'>{t(greeting!)}</Typography>
			</SystemTextMessageContainer>
			<Space height={0.2}  />
			<Typography variant='caption'>{formatDate(parseISO(message.date), { to: 'HH:mm' })}</Typography>
		</>
	)
}

export default SystemGreeting
