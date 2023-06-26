import { useEffect } from 'preact/hooks'
import styled from '@emotion/styled'

import AttachFileTwoToneIcon from '@mui/icons-material/AttachFileTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import FormatQuoteTwoToneIcon from '@mui/icons-material/FormatQuoteTwoTone'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
import SendTwoToneIcon from '@mui/icons-material/SendTwoTone'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

import { useModal } from '@/services/modals'

import Row from '@/ui/Row'
import Space from '@/ui/Space'

import PersonalMessageReply from '@/components/PersonalMessage/PersonalMessageReply'

import { messages } from './messages.mock'
import { useInput } from '@/hooks/useInput'
import { IMessage } from '@/model/message'
import { getText } from '@/model/message'
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

// REFACTOR dont like it... but it works :: used in MessageMenu.tsx
export const messageReplyOrEditUid = signal({ mode: '', uid: '' })

function getMessageByUid(uid?: string) {
	if (!uid) return
	return messages.find((m) => m.uid === uid)
}

function asReply(message?: IMessage) {
	return {
		author: { name: 'me' }, data: new Date().toISOString(), content: [{ type: 'reply', value: message }]
	} as unknown as IMessage
}

function RoomInput() {

	const { onOpen } = useModal('attachment')
	const message = getMessageByUid(messageReplyOrEditUid().uid())
	const replay = asReply(message)
	const text = getText(message)
	const isEdit = messageReplyOrEditUid().mode() === 'edit'

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
		if (messageReplyOrEditUid().uid()) textInput.inputRef.current?.focus()
	}, [ messageReplyOrEditUid().uid() ])

	const onRemoveClick = () => messageReplyOrEditUid.clear()

	const onSendClick = () => {
		textInput.onClear()
	}

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
				<Row justify='stretch' gap={1} align='end'>
					<IconButton color='secondary' onClick={onOpen} ><AttachFileTwoToneIcon /></IconButton>
					<Input {...textInput} />
					<IconButton color='primary' onClick={onSendClick}><SendTwoToneIcon /></IconButton>
				</Row>
			</Row>
		</RoomInputContainer>
	)
}

export default RoomInput
