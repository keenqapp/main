import styled from '@emotion/styled'

import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import { useModal } from '@/services/modals'

import Column from '@/ui/Column'
import Row from '@/ui/Row'
import Space from '@/ui/Space'

import { IPartnerRequest } from '@/model/message'


const PartnerRequestContainer = styled.div`
	align-self: center;
`

const Content = styled(Column)`
	border-radius: 1rem;
	padding: 0.5rem 1rem 1rem;
	background: ${p => p.theme.palette.primary.light};
`

const Buttons = styled(Row)`
	padding: 0 1rem;
`

function PartnerRequest({ from: member }: IPartnerRequest['value']) {
	const { name, image } = member
	const { onOpen } = useModal('partnerRequest')

	const requestClick = () => onOpen()

	const onYesClick = () => {}
	const onNoClick = () => {}

	return (
		<PartnerRequestContainer data-testid='PartnerRequest'>
			<Column gap={0.5}>
				<Content gap={1} onClick={requestClick}>
					<Row justify='start' gap={1}>
						<Avatar src={image} alt={name} />
						<Column>
							<Typography variant='h6'>{name}</Typography>
						</Column>
						<Space grow />
						<IconButton><MoreVertTwoToneIcon /></IconButton>
					</Row>
					<Typography variant='overline'>wants to add you as a partner</Typography>
				</Content>
				<Buttons>
					<Button startIcon={<HighlightOffTwoToneIcon color='secondary' />} color='secondary' onClick={onNoClick}>No</Button>
					<Button startIcon={<DoneOutlineTwoToneIcon color='primary' />} onClick={onYesClick}>Yes</Button>
				</Buttons>
			</Column>
			<Space />
		</PartnerRequestContainer>
	)
}

export default PartnerRequest
