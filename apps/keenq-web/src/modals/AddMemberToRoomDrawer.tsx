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
	{ id: '1', name: 'Patrisia', image: 'https://i.pravatar.cc/200?img=5' },
	{ id: '2', name: 'Mia', image: 'https://i.pravatar.cc/200?img=1' },
	{ id: '3', name: 'Liam', image: 'https://i.pravatar.cc/200?img=2' },
	{ id: '4', name: 'Noah', image: 'https://i.pravatar.cc/200?img=3' },
	{ id: '5', name: 'Emma', image: 'https://i.pravatar.cc/200?img=4' },
	{ id: '6', name: 'Olivia', image: 'https://i.pravatar.cc/200?img=5' },
	{ id: '7', name: 'Ava', image: 'https://i.pravatar.cc/200?img=1' },
	{ id: '8', name: 'Isabella', image: 'https://i.pravatar.cc/200?img=2' },
	{ id: '9', name: 'Sophia', image: 'https://i.pravatar.cc/200?img=3' },
	{ id: '10', name: 'Charlotte', image: 'https://i.pravatar.cc/200?img=4' },
	{ id: '11', name: 'Amelia', image: 'https://i.pravatar.cc/200?img=5' },
	{ id: '12', name: 'Mia', image: 'https://i.pravatar.cc/200?img=1' },
	{ id: '13', name: 'Liam', image: 'https://i.pravatar.cc/200?img=2' },
	{ id: '14', name: 'Noah', image: 'https://i.pravatar.cc/200?img=3' },
	{ id: '15', name: 'Emma', image: 'https://i.pravatar.cc/200?img=4' },
]

const selected = signal(new Set<string>())

function MemberItem({ id, name, image }: IMember) {
	const onChange = () => selected.value = selected.value.copyToggle(id)
	return (
		<MemberItemContainer gap={1} justify='start' onClick={onChange}>
			<Avatar src={image} alt={name} />
			<Row flex={1} >
				<Typography variant='h6'>{name}</Typography>
			</Row>
			<Checkbox value={selected.value.has(id)} />
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
		console.log('--- AddMemberToRoomDrawer.tsx:77 -> onClick ->', params.id, selected.value)
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
