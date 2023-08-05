import { useEffect, useState } from 'preact/hooks'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone'
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone'
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone'
import VolumeUpTwoToneIcon from '@mui/icons-material/VolumeUpTwoTone'

import { useModal } from '@/services/modals'

import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import Row from '@/ui/Row'
import Space from '@/ui/Space'

import { useInsert, useMutation, useQuery } from '@/hooks/gql'
import { inputsHasError, isNotEmpty, useInput } from '@/hooks/useInput'
import { idgql } from '@/model/gql'
import { createroomgql } from '@/model/room'


function CreateRoomModal() {
	const { name, open } = useModal('createRoom')
	const [ type, setType ] = useState('private')
	const [ result ] = useQuery(idgql)
	const [ , create ] = useInsert(createroomgql)

	const nameInput = useInput({
		label: 'Name it',
		placeholder: 'Fancy name',
		validation: [ isNotEmpty ]
	})

	useEffect(() => {
		if (!open) nameInput.onClear()
	}, [ open ])

	const onChange = (_: any, t: string) => setType(t)

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
		console.log('--- CreateRoomModal.tsx:53 -> onClick ->', data)
	}

	return (
		<Drawer data-testid='CreateRoomModal' name={name}>
			<Container>
				<Row direction='column' align='stretch' gap={2}>
					<TextField {...nameInput} />
					<ToggleButtonGroup
						fullWidth
						value={type}
						onChange={onChange}
						exclusive
						color='primary'
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
