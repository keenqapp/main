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
import { createPartnerRequestMessage, deletemessagegql, IPartnerRequest, updatemessagegql } from '@/model/message'
import { useCurrentRoom } from '@/model/room'

import Space from '@/ui/Space'
import Stack from '@/ui/Stack'

import { useMutation, useQuery, useUpdate } from '@/hooks/gql'
import { optional } from '@/utils/utils'


const PartnerRequestContainer = styled.div`
	align-self: center;
`

const Content = styled(Stack)`
	border-radius: 1rem;
	padding: 0.5rem 1rem 1rem;
	background: ${p => p.theme.palette.primary.light};
`

const Buttons = styled(Stack)`
	padding: 0 1rem;
`

const context = {
	additionalTypenames: ['members'],
}

function PartnerRequest({ id, to, from, result }: IPartnerRequest['value'] & { id: string }) {

	const { t } = useTranslate()
	const { id: cid } = useCurrentMember()
	const { id: rid } = useCurrentRoom()
	const isSelf = cid === from
	const mid = isSelf ? to : from

	const [ mresult ] = useQuery(membergql, { id: mid }, { context })
	const member = optional(mresult.data?.members_by_pk)
	const { name } = member
	const avatar = getAvatar(member)

	const { open } = useModal('partnerRequest')
	const [ , remove ] = useMutation(deletemessagegql)
	const [ , update ] = useUpdate(updatemessagegql)
	const [ , link ] = useUpdate(updatepartnergql)

	const requestClick = () => open({ id: to })

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
			const msg = createPartnerRequestMessage(rid, from, to, 'accepted')
			update(id, msg)
		}
		catch (e) {
			console.log('--- PartnerRequest.tsx:76 -> onYesClick ->', e)
		}
	}
	const onNoClick = () => {
		update(id, { value: { to, from, result: 'declined' } })
	}

	const onCancelClick = () => remove({ id })

	return (
		<PartnerRequestContainer data-testid='PartnerRequest'>
			<Stack gap={0.5}>
				<Content gap={1} onClick={requestClick}>
					<Stack justify='start' gap={1}>
						<Avatar src={avatar?.url} alt={name} />
						<Stack>
							<Typography variant='h6'>{name}</Typography>
						</Stack>
						<Space grow />
						<IconButton><MoreVertTwoToneIcon /></IconButton>
					</Stack>
					<Typography variant='overline'>
						{result === 'accepted' && t`partner.accepted`}
						{result !== 'accepted' && (
							isSelf
								? t`partner.want`
								: t`partner.wants`
						)}
					</Typography>
				</Content>
				{result !== 'accepted' && (
					isSelf
						? (
							<Buttons justify='end'>
								<Button startIcon={<HighlightOffTwoToneIcon color='secondary' />} color='secondary' onClick={onCancelClick}>{t`words.cancel`}</Button>
							</Buttons>
						): (
							<Buttons>
								<Button startIcon={<HighlightOffTwoToneIcon color='secondary' />} color='secondary' onClick={onNoClick}>{t`words.no`}</Button>
								<Button startIcon={<DoneOutlineTwoToneIcon color='primary' />} onClick={onYesClick}>{t`words.yes`}</Button>
							</Buttons>
						)
				)}
			</Stack>
			<Space />
		</PartnerRequestContainer>
	)
}

export default PartnerRequest
