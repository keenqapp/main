import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone'
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone'

import { useModal } from '@/services/modals'

import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import List from '@/ui/List'
import Row from '@/ui/Row'
import Space from '@/ui/Space'

import EmptyMembers from '@/components/EmptyMembers'

import { useInput } from '@/hooks/useInput'
import { useCurrentMember } from '@/model/member'
import { IMember } from '@/model/member'


const StyledContainer = styled(Container)`
  height: calc(100vh - var(--vertical-space) * 4);
`

const MembersList = styled(List)`
	gap: 1rem;
`

const MemberItemContainer = styled(Row)`
	padding: 0 1rem;
`

function MemberItem({ id, name, image }: IMember) {
	const navigate = useNavigate()
	const { id: cid } = useCurrentMember()
	const { on } = useModal('addPartner')

	const partnerClick = () => {
		// TODO
		// 1. find or create room
		// 2. navigate to room with 'add partner request' system message
		// navigate(`/room/${id}`)
	}

	return (
		<MemberItemContainer gap={1} justify='start' onClick={on(partnerClick)}>
			<Avatar src={image?.url} alt={name} />
			<Row flex={1}>
				<Typography variant='h6'>{name}</Typography>
			</Row>
			<IconButton color='primary'><GroupAddTwoToneIcon /></IconButton>
		</MemberItemContainer>
	)
}

function AddPartnerDrawer() {
	const { name } = useModal('addPartner')

	const nameInput = useInput({
		label: 'Find who you want',
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
					data={[]}
					render={MemberItem}
					empty={EmptyMembers}
				/>
			</StyledContainer>
		</Drawer>
	)
}

export default AddPartnerDrawer
