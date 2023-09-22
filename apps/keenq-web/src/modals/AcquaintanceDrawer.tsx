import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone'

import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import Card from '@/ui/Card'
import Stack from '@/ui/Stack'
import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import Space from '@/ui/Space'


function AcquaintanceDrawer() {
	const { t } = useTranslate('acquaintance')
	const navigate = useNavigate()
	const { name, on } = useModal('acquaintance')

	const doIt = () => navigate('/profile')

	return (
		<Drawer data-testid='AcquaintanceDrawer' name={name}>
			<Container>
				<Stack direction='column'>
					<Card>
						<Typography variant='overline' textAlign='center'>{t`before`}</Typography>
					</Card>
					<Space />
					<Button startIcon={<BadgeTwoToneIcon />} onClick={on(doIt)}>{t`app.doit`}</Button>
				</Stack>
			</Container>
		</Drawer>
	)
}

export default AcquaintanceDrawer
