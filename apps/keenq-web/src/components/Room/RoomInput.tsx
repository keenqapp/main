import styled from '@emotion/styled'

import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

import Row from '@/ui/Row'

import { useInput } from '@/hooks/useInput'


const RoomInputContainer = styled.div`
	min-height: var(--vertical-space);
  padding: 0 1rem 0;
	
	& textarea, .MuiInputBase-root {
		padding: 0.3rem 0.5rem;
	}
`

const Input = styled(TextField)`
	flex-grow: 1;
`

function RoomInput() {

	const text = useInput({
		variant: 'outlined',
		fullWidth: true,
		autocomplete: 'off',
		dense: true,
		multiline: true,
		maxRows: 3,
	})

	return (
		<RoomInputContainer data-testid='RoomInput'>
			<Row justify='stretch' gap={1} align='end'>
				<IconButton color='secondary'><AttachFileTwoToneIcon /></IconButton>
				<Input {...text} />
				<IconButton color='primary'><SendTwoToneIcon /></IconButton>
			</Row>
		</RoomInputContainer>
	)
}

export default RoomInput
