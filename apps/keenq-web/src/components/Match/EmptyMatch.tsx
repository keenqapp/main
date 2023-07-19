import Typography from '@mui/material/Typography'

import Card from '@/ui/Card'
import Container from '@/ui/Container'
import Space from '@/ui/Space'


const NO_MATCH_TEXT = 'For now we don\'t have Matches for you.\n\nTry to find new members on events or rooms'

function EmptyMatch() {
	return (
		<Container data-testid='EmptyMatch'>
			<Space height={2} />
			<Card>
				<Typography variant='overline' textAlign='center'>{NO_MATCH_TEXT}</Typography>
			</Card>

		</Container>
	)
}

export default EmptyMatch
