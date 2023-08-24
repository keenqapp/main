import styled from '@emotion/styled'

import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone'

import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { getAvatar, IMemberPartner, membergql, updatepartnergql, useCurrentMember } from '@/model/member'
import { deletemessagegql, IPartnerRequest } from '@/model/message'

import Column from '@/ui/Column'
import Row from '@/ui/Row'
import Space from '@/ui/Space'

import { useMutation, useQuery, useUpdate } from '@/hooks/gql'
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

	const { t } = useTranslate()

	const [ result ] = useQuery(membergql, { id: to }, { context })
	const { id: mid } = useCurrentMember()
	const isSelf = mid === from
	const member = optional(result.data?.members_by_pk)
	const { name } = member
	const avatar = getAvatar(member)

	const { onOpen } = useModal('partnerRequest')
	const [ , remove ] = useMutation(deletemessagegql)
	const [ , link ] = useUpdate(updatepartnergql)

	const requestClick = () => onOpen({ id: to })

	const onYesClick = async () => {
		const linkedTo = {
			type: 'partner',
			value: { id: to },
		} as IMemberPartner
		const linkedFrom = {
			type: 'partner',
			value: { id: from },
		} as IMemberPartner
		try {
			await link(from, { linked: linkedTo })
			await link(to, { linked: linkedFrom })
			remove({ id })
		}
		catch (e) {
			console.log('--- PartnerRequest.tsx:76 -> onYesClick ->', e)
		}
	}
	const onNoClick = () => remove({ id })

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
							? t`partner.want`
							: t`partner.wants`}
					</Typography>
				</Content>
				{isSelf
					? (
						<Buttons justify='end'>
							<Button startIcon={<HighlightOffTwoToneIcon color='secondary' />} color='secondary' onClick={onCancelClick}>{t`words.cancel`}</Button>
						</Buttons>
					): (
						<Buttons>
							<Button startIcon={<HighlightOffTwoToneIcon color='secondary' />} color='secondary' onClick={onNoClick}>{t`words.no`}</Button>
							<Button startIcon={<DoneOutlineTwoToneIcon color='primary' />} onClick={onYesClick}>{t`words.yes`}</Button>
						</Buttons>
					)}
			</Column>
			<Space />
		</PartnerRequestContainer>
	)
}

export default PartnerRequest
