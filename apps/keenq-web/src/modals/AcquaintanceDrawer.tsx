import { useNavigate } from 'react-router-dom'

import BadgeTwoToneIcon from '@mui/icons-material/BadgeTwoTone'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { useModal } from '@/services/modals'

import Card from '@/ui/Card'
import Column from '@/ui/Column'
import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import Space from '@/ui/Space'


function AcquaintanceDrawer() {
	const navigate = useNavigate()
	const { name, on } = useModal('acquaintance')

	const doItClick = () => navigate('/profile')

	return (
		<Drawer data-testid='AcquaintanceDrawer' name={name}>
			<Container>
				<Column>
					<Card>
						<Typography variant='overline' textAlign='center'>Before start matching you should fill your profile</Typography>
					</Card>
					<Space />
					<Button startIcon={<BadgeTwoToneIcon />} onClick={on(doItClick)}>Do it</Button>
				</Column>
			</Container>
		</Drawer>
	)
}

export default AcquaintanceDrawer
