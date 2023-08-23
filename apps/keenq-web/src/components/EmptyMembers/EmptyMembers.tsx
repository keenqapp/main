import { useNavigate } from 'react-router-dom'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import ArrowBackIosTwoToneIcon from '@mui/icons-material/ArrowBackIosTwoTone'

import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import Card from '@/ui/Card'
import Column from '@/ui/Column'
import Space from '@/ui/Space'


function EmptyMembers() {
	const { t } = useTranslate()
	const navigate = useNavigate()
	const { closeAll } = useModal('addPartner')
	const onClick = () => {
		closeAll()
		navigate('/match')
	}
	return (
		<>
			<Card data-testid='EmptyMembers'>
				<Column gap={1}>
					<Typography variant='h6'>{t`member.notFound`}</Typography>
					<Typography variant='overline'>{t`member.shouldMatch`}</Typography>
				</Column>
			</Card>
			<Space />
			<Button startIcon={<ArrowBackIosTwoToneIcon color='primary' />} onClick={onClick} fullWidth>{t`member.try`}</Button>
		</>
	)
}

export default EmptyMembers
