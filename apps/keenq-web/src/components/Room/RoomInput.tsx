import styled from '@emotion/styled'

import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

import Row from '@/ui/Row'


const RoomInputContainer = styled.div`
	height: var(--vertical-space);
  padding: 0 1rem;
	position: relative;
`

const Input = styled(TextField)`
	flex-grow: 1;
`

const Fade = styled.div`
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
	width: 100%;
	position: absolute;
	left: 0;
	top: -1rem;
	height: 1rem;
`

function RoomInput() {
	return (
		<RoomInputContainer data-testid='RoomInput'>
			<Fade />
			<Row justify='stretch' gap={1}>
				<IconButton color='secondary'><AttachFileTwoToneIcon /></IconButton>
				<Input variant='outlined' fullwidth />
				<IconButton color='primary'><SendTwoToneIcon /></IconButton>
			</Row>
		</RoomInputContainer>
	)
}

export default RoomInput
