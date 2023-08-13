import Typography from '@mui/material/Typography'

import { useTranslate } from '@/services/translate'

import Card from '@/ui/Card'
import Container from '@/ui/Container'
import Space from '@/ui/Space'


function EmptyMatch() {
	const { t } = useTranslate()
	return (
		<Container data-testid='EmptyMatch'>
			<Space height={2} />
			<Card>
				<Typography variant='overline' textAlign='center'>{t`match.empty`}</Typography>
			</Card>
		</Container>
	)
}

export default EmptyMatch
