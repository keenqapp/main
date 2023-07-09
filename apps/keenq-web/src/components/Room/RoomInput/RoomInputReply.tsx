import { useStore } from '@nanostores/preact'

import IconButton from '@mui/material/IconButton'

import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import FormatQuoteTwoToneIcon from '@mui/icons-material/FormatQuoteTwoTone'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'

import Row from '@/ui/Row'
import Space from '@/ui/Space'

import PersonalMessageReply from '@/components/PersonalMessage/PersonalMessageReply'
import { $messageReplyOrEditId, clear } from '@/components/Room/RoomInput/state'

import { useQuery } from '@/hooks/gql'
import { IMessage } from '@/model/message'
import { messagegql } from '@/model/message'


export function asReply(message?: IMessage) {
	return {
		author: { name: 'me' }, data: new Date().toISOString(), content: [{ type: 'reply', value: message }]
	} as unknown as IMessage
}

function RoomInputReply() {
	const messageReplyOrEditId = useStore($messageReplyOrEditId)
	if (!messageReplyOrEditId.id) return null

	const [ result ] = useQuery(messagegql, { id: messageReplyOrEditId.id })
	const message = result.data?.messages_by_pk
	if (!message) return null

	const replay = asReply(message)
	const isEdit = messageReplyOrEditId.mode === 'edit'

	return (
		<Row justify='start' gap={1}>
			<IconButton color='primary'>{isEdit ? <EditTwoToneIcon /> : <FormatQuoteTwoToneIcon />}</IconButton>
			<PersonalMessageReply {...replay} />
			<Space grow />
			<IconButton color='secondary' onClick={clear}><HighlightOffTwoToneIcon /></IconButton>
		</Row>
	)
}

export default RoomInputReply
