import styled from '@emotion/styled'

import Typography from '@mui/material/Typography'

import theme from '@/ui/theme'
import Space from '@/ui/Space'


const SystemTextMessageContainer = styled.div`
	text-align: center;
	background:${theme.color.primaryVeryLight};
	align-self: center;
	border-radius: 1rem;
	padding: 0.2rem 1rem;
`

function SystemTextMessage({ text }: { text: string }) {
	return (
		<>
			<SystemTextMessageContainer data-testid='SystemTextMessage'>
				<Typography variant='overline'>{text}</Typography>
			</SystemTextMessageContainer>
			<Space height={0.2}  />
		</>
	)
}

export default SystemTextMessage
