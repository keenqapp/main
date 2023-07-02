import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone'
import GroupAddTwoToneIcon from '@mui/icons-material/GroupAddTwoTone'
import Avatar from '@mui/material/Avatar'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { useModal } from '@/services/modals'

import Card from '@/ui/Card'
import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import List from '@/ui/List'
import Row from '@/ui/Row'
import Space from '@/ui/Space'

import { useCurrentMember } from '@/hooks/useCurrentMember'
import { useInput } from '@/hooks/useInput'
import { IMember } from '@/model/member'
import EmptyMembers from '@/components/EmptyMembers'


const StyledContainer = styled(Container)`
  height: calc(100vh - var(--vertical-space) * 4);
`

const MembersList = styled(List)`
	gap: 1rem;
`

const MemberItemContainer = styled(Row)`
	padding: 0 1rem;
`

const mockData = [
	{ uid: '1', name: 'Patrisia', image: 'https://i.pravatar.cc/200?img=5' },
	{ uid: '2', name: 'Mia', image: 'https://i.pravatar.cc/200?img=1' },
]

function MemberItem({ uid, name, image }: IMember) {
	const navigate = useNavigate()
	const { uid: currentUid } = useCurrentMember()
	const { on } = useModal('addPartner')

	const partnerClick = () => {
		// TODO
		// 1. find or create room
		// 2. navigate to room with 'add partner request' system message
		// navigate(`/room/${uid}`)
	}

	return (
		<MemberItemContainer gap={1} justify='start' onClick={on(partnerClick)}>
			<Avatar src={image!} alt={name} />
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
