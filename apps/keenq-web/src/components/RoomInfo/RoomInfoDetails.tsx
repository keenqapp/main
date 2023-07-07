import styled from '@emotion/styled'

import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography'

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'

import Container from '@/ui/Container'
import Row from '@/ui/Row'

import { useCurrentMember } from '@/model/member/hooks'
import { useDebounceMutation } from '@/hooks/useDebounceMutation'
import { isLengthLower, isNotEmpty, useInput } from '@/hooks/useInput'
import { useIsAdmin } from '@/hooks/useIsAdmin'
import { IRoom, updateroomgql } from '@/model/room'


const NameInput = styled(Input)`
  font-weight: 700;
  font-family: keenq, serif;
  font-size: 1.5rem;
  line-height: 1.334;
`

function RoomInfoDetails({ id, name, description }: IRoom) {
	const { id: cid } = useCurrentMember()
	const admin = useIsAdmin(cid)

	const [ , update ] = useDebounceMutation(updateroomgql)

	const nameInput = useInput({
		value: name,
		disableUnderline: true,
		fullWidth: true,
		validation: [ isNotEmpty, isLengthLower(24) ],
		forceValid: true,
		onChange: (value: string) => update(id, { name: value }),
	})

	const descriptionInput = useInput({
		value: description,
		multiline: true,
		disableUnderline: true,
		fullWidth: true,
		onChange: (value: string) => update(id, { description: value }),
	})

	const onNameClick = () => nameInput.inputRef.current?.focus()
	const onDescClick = () => descriptionInput.inputRef.current?.focus()

	return (
		<Container data-testid='RoomInfoDetails' horizontal={2}>
			{admin && (
				<Row onClick={onNameClick}>
					<NameInput {...nameInput} />
					<IconButton color='primary'><EditTwoToneIcon /></IconButton>
				</Row>
			)}
			{admin ? (
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
