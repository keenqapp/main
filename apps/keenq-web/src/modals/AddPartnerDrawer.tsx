import { useMemo } from 'preact/hooks'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone'
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone'

import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { IMatch } from '@/model/match'
import { contactsgql, getAvatar, useCurrentMember } from '@/model/member'
import { IMember } from '@/model/member'
import { createPartnerRequestMessage, insertmessagegql } from '@/model/message'
import { privateroomgql } from '@/model/rooms_members'

import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import List from '@/ui/List'
import Space from '@/ui/Space'
import Stack from '@/ui/Stack'

import EmptyMembers from '@/components/EmptyMembers'

import { useInsert, useQuery } from '@/hooks/gql'
import { useInput } from '@/hooks/useInput'
import { optional } from '@/utils/utils'


const StyledContainer = styled(Container)`
  height: calc(100vh - var(--vertical-space) * 4);
`

const MembersList = styled(List)`
	gap: 1rem;
`

const MemberItemContainer = styled(Stack)`
	padding: 0 1rem;
`

function MemberItem(member: IMember) {
	const { id: mid, name } = member
	const avatar = getAvatar(member)
	const { id: cid } = useCurrentMember()
	const { on } = useModal('addPartner')
	const navigate = useNavigate()
	const [ result ] = useQuery(privateroomgql, { cid, mid })
	const { id: rid } = optional(result.data?.rooms_members[0]?.room)
	const [ , insert ] = useInsert(insertmessagegql)

	const partnerClick = async () => {
		if (!rid) return
		const msg = createPartnerRequestMessage(rid, cid, mid)
		await insert(msg)
		navigate(`/room/${rid}`)
	}

	return (
		<MemberItemContainer gap={1} justify='start' onClick={on(partnerClick)}>
			<Avatar src={avatar?.url} alt={name} />
			<Stack flex={1}>
				<Typography variant='h6'>{name}</Typography>
			</Stack>
			<IconButton color='primary'><GroupAddTwoToneIcon /></IconButton>
		</MemberItemContainer>
	)
}

function AddPartnerDrawer() {
	const { t } = useTranslate('addMember')
	const { name } = useModal('addPartner')
	const { id } = useCurrentMember()
	const [ result ] = useQuery(contactsgql, { id }, { requestPolicy: 'cache-and-network' })
	const members = useMemo(() => result.data?.matches.map((match: IMatch) => match.member) || [], [ result.data ])

	const nameInput = useInput({
		label: t`find`,
		variant: 'outlined',
		fullWidth: true,
		InputProps: {
			endAdornment: <ClearTwoToneIcon onClick={() => nameInput.onClear()} />,
		}
	})

	return (
		<Drawer data-testid='ChooseMemberDrawer' fullHeight name={name}>
			<StyledContainer flex>
				<TextField {...nameInput} />
				<Space />
				<MembersList
					data={members}
					render={MemberItem}
					empty={EmptyMembers}
				/>
			</StyledContainer>
		</Drawer>
	)
}

export default AddPartnerDrawer
