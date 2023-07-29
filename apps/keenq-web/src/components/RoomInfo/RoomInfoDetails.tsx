import styled from '@emotion/styled'

import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography'

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'

import Container from '@/ui/Container'
import Row from '@/ui/Row'

import { useDebounceMutation } from '@/hooks/useDebounceMutation'
import { isLengthLower, isNotEmpty, useInput } from '@/hooks/useInput'
import { IRoom, updateroomgql, useCurrentRoom } from '@/model/room'


const NameInput = styled(Input)`
  font-weight: 700;
  font-family: keenq, serif;
  font-size: 1.5rem;
  line-height: 1.334;
`

function RoomInfoDetails({ id, name, description }: IRoom) {
	const { isAdmin } = useCurrentRoom()

	const [ , update ] = useDebounceMutation(updateroomgql)

	const nameInput = useInput({
		value: name,
		disableUnderline: true,
		fullWidth: true,
		validation: [ isNotEmpty, isLengthLower(24) ],
		forceValid: true,
		onChange: (_:any, value: string) => update(id, { name: value }),
	})

	const descriptionInput = useInput({
		value: description,
		multiline: true,
		disableUnderline: true,
		fullWidth: true,
		onChange: (_:any, value: string) => update(id, { description: value }),
	})

	const onNameClick = () => nameInput.inputRef.current?.focus()
	const onDescClick = () => descriptionInput.inputRef.current?.focus()

	return (
		<Container data-testid='RoomInfoDetails' horizontal={2}>
			{isAdmin && (
				<Row onClick={onNameClick}>
					<NameInput {...nameInput} />
					<IconButton color='primary'><EditTwoToneIcon /></IconButton>
				</Row>
			)}
			{isAdmin ? (
				<Row onClick={onDescClick} align='start'>
					<Input {...descriptionInput} />
					<IconButton color='primary'><EditTwoToneIcon /></IconButton>
				</Row>
			) : (
				<Typography>{description}</Typography>
			)}
		</Container>
	)
}

export default RoomInfoDetails
