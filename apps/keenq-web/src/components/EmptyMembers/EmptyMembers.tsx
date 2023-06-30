import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone'

import { useModal } from '@/services/modals'

import Card from '@/ui/Card'
import Column from '@/ui/Column'
import Space from '@/ui/Space'


function EmptyMembers() {
	const navigate = useNavigate()
	const { onCloseAll } = useModal('addPartner')
	const onClick = () => {
		onCloseAll()
		navigate('/match')
	}
	return (
		<>
			<Card data-testid='EmptyMembers'>
				<Column gap={1}>
					<Typography variant='h6'>No members found</Typography>
					<Typography variant='overline'>To choose member first you should match with them</Typography>
				</Column>
			</Card>
			<Space />
			<Button startIcon={<ArrowBackIosTwoToneIcon color='primary' />} onClick={onClick} fullWidth>Try it!</Button>
		</>
	)
}

export default EmptyMembers
