import styled from '@emotion/styled'

import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import Checkbox from '@/ui/Checkbox'
import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import List from '@/ui/List'
import Row from '@/ui/Row'
import Space from '@/ui/Space'

import { useInput } from '@/hooks/useInput'
import { useState } from 'preact/hooks'


const StyledContainer = styled(Container)`
  height: calc(100vh - var(--vertical-space) * 4);
`

const MembersList = styled(List)`
	gap: 1rem;
`

const mockData = [
	{ uid: '1', name: 'Patrisia', image: 'https://i.pravatar.cc/200?img=5' },
	{ uid: '2', name: 'Mia', image: 'https://i.pravatar.cc/200?img=1' },
]

export type IMember = typeof mockData[number]

function MemberItem({ name, image }: IMember) {
	const [ selected, setSelected ] = useState(false)
	return (
		<Row gap={1} justify='start'>
			<Avatar src={image} />
			<Row flex={1} onClick={() => setSelected(prev => !prev)}>
				<Typography variant='h6'>{name}</Typography>
			</Row>
			<Checkbox value={selected} onChange={setSelected} />
		</Row>
	)
}
function AddMemberDrawer() {

	const nameInput = useInput({
		label: 'Find who you want',
		variant: 'outlined',
		fullWidth: true,
		InputProps: {
			endAdornment: <ClearTwoToneIcon onClick={() => nameInput.onClear()} />,
		}
	})

	return (
		<Drawer data-testid='AddMemberDrawer' fullHeight name='addMember'>
			<StyledContainer>
				<TextField {...nameInput} />
				<Space />
				<MembersList
					data={mockData}
					renderItem={MemberItem}
				/>
			</StyledContainer>
		</Drawer>
	)
}

export default AddMemberDrawer
