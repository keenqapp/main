import styled from '@emotion/styled'
import { signal } from '@preact/signals'

import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone'
import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { useModal } from '@/services/modals'

import Checkbox from '@/ui/Checkbox'
import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import List from '@/ui/List'
import Row from '@/ui/Row'
import Space from '@/ui/Space'

import EmptyMembers from '@/components/EmptyMembers'

import { useInput } from '@/hooks/useInput'
import { IMember } from '@/model/member'
import { match } from '@/utils/utils'


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
	{ uid: '3', name: 'Liam', image: 'https://i.pravatar.cc/200?img=2' },
	{ uid: '4', name: 'Noah', image: 'https://i.pravatar.cc/200?img=3' },
	{ uid: '5', name: 'Emma', image: 'https://i.pravatar.cc/200?img=4' },
	{ uid: '6', name: 'Olivia', image: 'https://i.pravatar.cc/200?img=5' },
	{ uid: '7', name: 'Ava', image: 'https://i.pravatar.cc/200?img=1' },
	{ uid: '8', name: 'Isabella', image: 'https://i.pravatar.cc/200?img=2' },
	{ uid: '9', name: 'Sophia', image: 'https://i.pravatar.cc/200?img=3' },
	{ uid: '10', name: 'Charlotte', image: 'https://i.pravatar.cc/200?img=4' },
	{ uid: '11', name: 'Amelia', image: 'https://i.pravatar.cc/200?img=5' },
	{ uid: '12', name: 'Mia', image: 'https://i.pravatar.cc/200?img=1' },
	{ uid: '13', name: 'Liam', image: 'https://i.pravatar.cc/200?img=2' },
	{ uid: '14', name: 'Noah', image: 'https://i.pravatar.cc/200?img=3' },
	{ uid: '15', name: 'Emma', image: 'https://i.pravatar.cc/200?img=4' },
]

const selected = signal(new Set<string>())

function MemberItem({ uid, name, image }: IMember) {
	const onChange = () => selected.value = selected.value.copyToggle(uid)
	return (
		<MemberItemContainer gap={1} justify='start' onClick={onChange}>
			<Avatar src={image} alt={name} />
			<Row flex={1} >
				<Typography variant='h6'>{name}</Typography>
			</Row>
			<Checkbox value={selected.value.has(uid)} />
		</MemberItemContainer>
	)
}
function AddMemberToRoom() {

	const { params, name, on } = useModal('addMemberToRoom')

	const nameInput = useInput({
		label: 'Find who you want',
		variant: 'outlined',
		fullWidth: true,
		InputProps: {
			endAdornment: <ClearTwoToneIcon onClick={() => nameInput.onClear()} />,
		}
	})

	const click = () => {
		console.log('--- AddMemberToRoomDrawer.tsx:77 -> onClick ->', params.uid, selected.value)
	}

	const data = mockData.filter(({ name }) => match(nameInput.value, name))

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
				{data.length > 0 && <Button onClick={on(click)} fullWidth startIcon={<CheckTwoToneIcon />}>Yeap</Button>}
			</StyledContainer>
		</Drawer>
	)
}

export default AddMemberToRoom
