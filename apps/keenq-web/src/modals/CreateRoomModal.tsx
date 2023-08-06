import { useEffect, useState } from 'preact/hooks'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone'
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone'
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone'
import VolumeUpTwoToneIcon from '@mui/icons-material/VolumeUpTwoTone'

import { useModal } from '@/services/modals'

import Card from '@/ui/Card'
import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import Row from '@/ui/Row'
import Space from '@/ui/Space'

import { useInsert, useQuery } from '@/hooks/gql'
import { inputsHasError, isNotEmpty, useInput } from '@/hooks/useInput'
import { idgql } from '@/model/gql'
import { useCurrentMember } from '@/model/member'
import { createroomgql } from '@/model/room'
import { joinroom } from '@/model/rooms_members'


function CreateRoomModal() {
	const { id: memberId } = useCurrentMember()
	const { name, open } = useModal('createRoom')
	const [ type, setType ] = useState('private')
	const [ result ] = useQuery(idgql)
	const [ , create ] = useInsert(createroomgql)
	const [ , join ] = useInsert(joinroom)

	const nameInput = useInput({
		label: 'Name it',
		placeholder: 'Fancy name',
		validation: [ isNotEmpty ]
	})

	useEffect(() => {
		if (!open) nameInput.onClear()
	}, [ open ])

	const onChange = (_: any, t: string) => t !== null && setType(t)

	const onClick = async () => {
		if (inputsHasError(nameInput)) return
		const id = result.data?.id.data.id
		if (!id) return
		const object = {
			id,
			name: nameInput.value,
			type,
		}
		const { data } = await create(object)
		const roomId = data?.insert_rooms_one.id
		await join({ memberId, roomId, privateFor: roomId, role: 'owner' })
	}

	return (
		<Drawer data-testid='CreateRoomModal' name={name}>
			<Container>
				<Row direction='column' align='stretch' gap={2}>
					<Card>
						<Typography variant='overline'>
							<b>Private</b> - only members can invite others<br />
							<b>Public</b> - everyone can join<br />
							<b>Channel</b> - only admins can write messages<br />
						</Typography>
					</Card>
					<TextField {...nameInput} />
					<ToggleButtonGroup
						value={type}
						onChange={onChange}
						color='primary'
						fullWidth
						exclusive
					>
						<ToggleButton value='channel'><VolumeUpTwoToneIcon fontSize='small' /><Space width={0.2}/>Channel</ToggleButton>
						<ToggleButton value='public'><QuestionAnswerTwoToneIcon fontSize='small' /><Space width={0.2}/>Public</ToggleButton>
						<ToggleButton value='private'><VerifiedUserTwoToneIcon fontSize='small' /><Space width={0.2}/>Private</ToggleButton>
					</ToggleButtonGroup>
					<Button startIcon={<CheckTwoToneIcon />} onClick={onClick}>Okay</Button>
				</Row>
			</Container>
		</Drawer>
	)
}

export default CreateRoomModal
