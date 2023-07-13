import styled from '@emotion/styled'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'

import { useModal } from '@/services/modals'

import Column from '@/ui/Column'
import Row from '@/ui/Row'
import Space from '@/ui/Space'

import { useMutation, useQuery } from '@/hooks/gql'
import { getAvatar, membergql, useCurrentMember } from '@/model/member'
import { deletemessagegql, IPartnerRequest } from '@/model/message'
import { optional } from '@/utils/utils'


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

const context = {
	additionalTypenames: ['members'],
}

function PartnerRequest({ id, to, from }: IPartnerRequest['value'] & { id: string }) {
	const [ result ] = useQuery(membergql, { id: to }, { context })
	const { id: mid } = useCurrentMember()
	const isSelf = mid === from
	const member = optional(result.data?.members_by_pk)
	const { name } = member
	const avatar = getAvatar(member)
	const { onOpen } = useModal('partnerRequest')
	const [ , remove ] = useMutation(deletemessagegql)

	const requestClick = () => onOpen()

	const onYesClick = () => {}
	const onNoClick = () => {}

	const onCancelClick = () => remove({ id })

	return (
		<PartnerRequestContainer data-testid='PartnerRequest'>
			<Column gap={0.5}>
				<Content gap={1} onClick={requestClick}>
					<Row justify='start' gap={1}>
						<Avatar src={avatar?.url} alt={name} />
						<Column>
							<Typography variant='h6'>{name}</Typography>
						</Column>
						<Space grow />
						<IconButton><MoreVertTwoToneIcon /></IconButton>
					</Row>
					<Typography variant='overline'>
						{isSelf
							? 'want to add a partner'
							: 'wants to add you as a partner'}
					</Typography>
				</Content>
				{isSelf
					? (
						<Buttons justify='end'>
							<Button startIcon={<HighlightOffTwoToneIcon color='secondary' />} color='secondary' onClick={onCancelClick}>Cancel</Button>
						</Buttons>
					): (
						<Buttons>
							<Button startIcon={<HighlightOffTwoToneIcon color='secondary' />} color='secondary' onClick={onNoClick}>No</Button>
							<Button startIcon={<DoneOutlineTwoToneIcon color='primary' />} onClick={onYesClick}>Yes</Button>
						</Buttons>
					)}
			</Column>
			<Space />
		</PartnerRequestContainer>
	)
}

export default PartnerRequest
