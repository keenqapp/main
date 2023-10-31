import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone'

import { useTranslate } from '@/services/translate'

import Card from '@/ui/Card'
import Container from '@/ui/Container'
import Space from '@/ui/Space'

import { useMatch } from '@/hooks/useMatch'


function EmptyMatch() {
	const { t } = useTranslate()
	const { queue, reset } = useMatch()
	return (
		<Container data-testid='EmptyMatch'>
			<Space height={2} />
			<Card>
				<Typography variant='overline' textAlign='center'>{t`match.empty`}</Typography>
			</Card>
			{queue.length > 0 && (
				<>
					<Space height={2} />
					<Button startIcon={<ArrowBackIosTwoToneIcon />} fullWidth onClick={reset}>{t`match.back`}</Button>
				</>
			)}
		</Container>
	)
}

export default EmptyMatch
