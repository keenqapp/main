import SentimentDissatisfiedTwoToneIcon from '@mui/icons-material/SentimentDissatisfiedTwoTone'

import { useTranslate } from '@/services/translate'

import Card from '@/ui/Card'
import Container from '@/ui/Container'
import Row from '@/ui/Row'
import Space from '@/ui/Space'
import Text from '@/ui/Text'


function RoomBanned() {
	const { t } = useTranslate()
	return (
		<Container data-testid='RoomBanned'>
			<Space height={2} />
			<Card>
				<Row direction='column' gap={1}>
					<Text variant='overline' align='center'>{t`room.banned`}</Text>
					<SentimentDissatisfiedTwoToneIcon color='secondary' />
				</Row>
			</Card>
		</Container>
	)
}

export default RoomBanned
