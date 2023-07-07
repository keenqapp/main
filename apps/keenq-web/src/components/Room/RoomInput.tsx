import { useEffect } from 'preact/hooks'
import styled from '@emotion/styled'

import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import FormatQuoteTwoToneIcon from '@mui/icons-material/FormatQuoteTwoTone'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone'

import { useModal } from '@/services/modals'

import Row from '@/ui/Row'
import Space from '@/ui/Space'

import PersonalMessageReply from '@/components/PersonalMessage/PersonalMessageReply'

import { messages } from './messages.mock'
import { useInput } from '@/hooks/useInput'
import { useCurrentMember } from '@/model/member/hooks'
import { IMessage } from '@/model/message'
import { getText } from '@/model/message'
import { $isChannel } from '@/model/room'
import { useCurrentRoom } from '@/model/room/hooks'
import { signal } from '@/utils/signals'


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

export const messageReplyOrEditId = signal({ mode: '', id: '' })

function getMessageById(id?: string) {
	if (!id) return
	return messages.find((m) => m.id === id)
}

function asReply(message?: IMessage) {
	return {
		author: { name: 'me' }, data: new Date().toISOString(), content: [{ type: 'reply', value: message }]
	} as unknown as IMessage
}

function RoomInput() {

	const { id: mid } = useCurrentMember()
	const { onOpen } = useModal('attachment')
	const { room, isMember, isAdmin } = useCurrentRoom()
	const isChannel = $isChannel(room)

	const message = getMessageById(messageReplyOrEditId().id())
	const replay = asReply(message)
	const text = getText(message)
	const isEdit = messageReplyOrEditId().mode() === 'edit'

	const textInput = useInput({
		value: isEdit ? text : '',
		variant: 'outlined',
		fullWidth: true,
		autocomplete: 'off',
		dense: true,
		multiline: true,
		maxRows: 3,
	})

	useEffect(() => {
		if (messageReplyOrEditId().id()) textInput.inputRef.current?.focus()
	}, [ messageReplyOrEditId().id() ])

	const onRemoveClick = () => messageReplyOrEditId.clear()

	const onSendClick = () => {
		textInput.onClear()
	}

	const onJoinClick = () => {
		console.log('--- RoomInput.tsx:95 -> onJoinClick ->', 'onJoinClick')
	}

	const showInput =  isAdmin || (!isChannel && isMember)
	const showJoin = !isMember

	return (
		<RoomInputContainer data-testid='RoomInput'>
			<Row direction='column' align='stretch' gap={0.2}>
				{message && (
					<Row justify='start' gap={1}>
						<IconButton color='primary'>{isEdit ? <EditTwoToneIcon /> : <FormatQuoteTwoToneIcon />}</IconButton>
						<PersonalMessageReply {...replay} />
						<Space grow />
						<IconButton color='secondary' onClick={onRemoveClick}><HighlightOffTwoToneIcon /></IconButton>
					</Row>
				)}
				{showInput && (
					<Row justify='stretch' gap={1} align='end'>
						<IconButton color='secondary' onClick={onOpen} ><AttachFileTwoToneIcon /></IconButton>
						<Input {...textInput} />
						<IconButton color='primary' onClick={onSendClick}><SendTwoToneIcon /></IconButton>
					</Row>
				)}
				{showJoin && <Button onClick={onJoinClick} fullWidth>Join</Button>}
			</Row>
		</RoomInputContainer>
	)
}

export default RoomInput
