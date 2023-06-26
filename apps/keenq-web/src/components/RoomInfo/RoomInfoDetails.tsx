import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import IconButton from '@mui/material/IconButton'
import Input from '@mui/material/Input'
import Typography from '@mui/material/Typography'

import Container from '@/ui/Container'
import Row from '@/ui/Row'

import { useCurrentMember } from '@/hooks/useCurrentMember'
import { useInput } from '@/hooks/useInput'
import { useIsAdmin } from '@/hooks/useIsAdmin'
import { IRoom } from '@/types/room'


function RoomInfoDetails({ description }: IRoom) {
	const { uid: cuid } = useCurrentMember()
	const admin = useIsAdmin(cuid)

	const descriptionInput = useInput({
		value: description,
		multiline: true,
		disableUnderline: true,
		fullWidth: true,
		onChange: (e: any) => console.log(e.target.value),
	})

	const onDescClick = () => descriptionInput.inputRef.current?.focus()

	return (
		<Container data-testid='RoomInfoDetails' horizontal={2}>
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
