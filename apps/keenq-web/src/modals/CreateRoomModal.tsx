import { useEffect, useState } from 'react'

import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone'
import QuestionAnswerTwoToneIcon from '@mui/icons-material/QuestionAnswerTwoTone'
import VerifiedUserTwoToneIcon from '@mui/icons-material/VerifiedUserTwoTone'
import VolumeUpTwoToneIcon from '@mui/icons-material/VolumeUpTwoTone'

import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { getidgql } from '@/model/gql'
import { useCurrentMember } from '@/model/member'
import { createroomgql } from '@/model/room'
import { insertjoinroom } from '@/model/rooms_members'

import Card from '@/ui/Card'
import Container from '@/ui/Container'
import Drawer from '@/ui/Drawer'
import Stack from '@/ui/Stack'
import Space from '@/ui/Space'

import { useInsert, useQuery } from '@/hooks/gql'
import { inputsHasError, isNotEmpty, useInput } from '@/hooks/useInput'


function CreateRoomModal() {
	const { t } = useTranslate('rooms')
	const { t: ta } = useTranslate('app')
	const { id: memberId } = useCurrentMember()
	const { name, open, on } = useModal('createRoom')
	const [ type, setType ] = useState('private')
	const [ result ] = useQuery(getidgql)
	const [ , create ] = useInsert(createroomgql)
	const [ , join ] = useInsert(insertjoinroom)

	const nameInput = useInput({
		label: t`name`,
		placeholder: 'Fancy name',
		validation: [ isNotEmpty ]
	})

	useEffect(() => {
		if (!open) nameInput.onClear()
	}, [ open ])

	const onChange = (_: any, t: string) => t !== null && setType(t)

	const click = async () => {
		if (inputsHasError(nameInput)) return
		const id = result.data?.getid.data.id
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
				<Stack direction='column' align='stretch' gap={2}>
					<Card>
						<Typography variant='overline'>
							<b>{t`private`}</b> - {t`onlyMembers`}<br />
							<Space height={0.4} />
							<b>{t`public`}</b> - {t`everyone`}<br />
							<Space height={0.4} />
							<b>{t`channel`}</b> - {t`onlyAdmins`}<br />
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
						<ToggleButton value='channel'><VolumeUpTwoToneIcon fontSize='small' /><Space width={0.2}/>{t`channel`}</ToggleButton>
						<ToggleButton value='public'><QuestionAnswerTwoToneIcon fontSize='small' /><Space width={0.2}/>{t`public`}</ToggleButton>
						<ToggleButton value='private'><VerifiedUserTwoToneIcon fontSize='small' /><Space width={0.2}/>{t`private`}</ToggleButton>
					</ToggleButtonGroup>
					<Button startIcon={<CheckTwoToneIcon />} onClick={on(click)}>{ta`okay`}</Button>
				</Stack>
			</Container>
		</Drawer>
	)
}

export default CreateRoomModal
