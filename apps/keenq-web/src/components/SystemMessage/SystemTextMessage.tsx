import styled from '@emotion/styled'

import Typography from '@mui/material/Typography'

import { useTranslate } from '@/services/translate'

import { IMessageText } from '@/model/message'

import Space from '@/ui/Space'
import theme from '@/ui/theme'


const SystemTextMessageContainer = styled.div`
	text-align: center;
	background:${theme.color.primaryVeryLight};
	align-self: center;
	border-radius: 1rem;
	padding: 0.2rem 1rem;
`

function SystemTextMessage({ value }: Pick<IMessageText, 'value'>) {
	const { t } = useTranslate()
	return (
		<>
			<SystemTextMessageContainer data-testid='SystemTextMessage'>
				<Typography variant='overline'>{t(value.text)}</Typography>
			</SystemTextMessageContainer>
			<Space height={0.2}  />
		</>
	)
}

export default SystemTextMessage
