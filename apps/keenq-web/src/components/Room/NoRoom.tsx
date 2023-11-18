import ContactSupportTwoToneIcon from '@mui/icons-material/ContactSupportTwoTone'

import { useTranslate } from '@/services/translate'

import Card from '@/ui/Card'
import Container from '@/ui/Container'
import Space from '@/ui/Space'
import Text from '@/ui/Text'


function NoRoom() {
	const { t } = useTranslate()
	return (
		<Container data-testid='NoRoom'>
			<Space height={2} />
			<Card>
				<ContactSupportTwoToneIcon color='secondary' fontSize='large' />
				<Space />
				<Text variant='overline' textAlign='center'>{t`room.noRoom`}</Text>
			</Card>
		</Container>
	)
}

export default NoRoom
