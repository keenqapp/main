import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import FormatQuoteTwoToneIcon from '@mui/icons-material/FormatQuoteTwoTone'
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone'

import { useModal } from '@/services/modals'

import Drawer, { DrawerItem, DrawerList } from '@/ui/Drawer'
import Row from '@/ui/Row'

import { $messageReplyOrEditId } from '@/components/Room/RoomInput/state'

import { useMutation } from '@/hooks/gql'
import { useIsAuthor } from '@/model/member'
import { useCurrentMember } from '@/model/member/hooks'
import { deletemessagegql } from '@/model/message'
import { $isChannel, useCurrentRoom } from '@/model/room'


const Reactions = styled(Row)`
	margin: 0 0.5rem;
	border-radius: 8px;
	padding: 1rem 1.5rem;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`

const reactions = [
	{ id: '7', emoji: '💩' },
	{ id: '6', emoji: '👎' },
	{ id: '5', emoji: '😄' },
	{ id: '4', emoji: '️👍' },
	{ id: '3', emoji: '🥰' },
	{ id: '2', emoji: '🔥' },
	{ id: '1', emoji: '❤️' },
]

function MessageMenu() {
	const navigate = useNavigate()
	const { id: mid } = useCurrentMember()
	const { name, params, on } = useModal('message')
	const { onOpen } = useModal('report')
	const { id, authorId } = params
	const { room, isAdmin } = useCurrentRoom()
	const { id: rid } = room
	const [ , remove ] = useMutation(deletemessagegql)

	const reportClick = () => onOpen({ entity: 'message', id })

	const profileClick = () => navigate(`/match/${authorId}`)

	const roomClick = () => navigate(`/room/${rid}/info`)

	const deleteClick = () => {
		remove({ id })
	}

	const replyClick = () => {
		$messageReplyOrEditId.set({ mode: 'reply', id })
	}

	const editClick = () => {
		$messageReplyOrEditId.set({ mode: 'edit', id })
	}

	const reactionClick = (id: string) => () => {
		console.log('--- MessageMenu.tsx:61 -> reactionClick ->', id, mid)
	}

	const isAuthor = useIsAuthor(authorId)
	const isChannel = $isChannel(room)

	const isEditable = (!isChannel && isAuthor) || (isChannel && isAdmin)
	const isReplyable = !isChannel || (isChannel && isAdmin)

	return (
		<Drawer data-testid='MessageMenu' name={name}>
			<DrawerList>
				<DrawerItem icon={<ReportTwoToneIcon color='error' />} text='Report' onClick={on(reportClick)} />
				{(isAuthor || isAdmin) && <DrawerItem icon={<DeleteForeverTwoToneIcon color='warning' />} text='Delete' onClick={on(deleteClick)} />}
				{!isAuthor && !isChannel && <DrawerItem icon={<AccountCircleTwoToneIcon color='primary' />} text='Profile' onClick={on(profileClick)} />}
				{isChannel && <DrawerItem icon={<AccountCircleTwoToneIcon color='primary' />} text='Room' onClick={on(roomClick)} />}
				{isEditable && <DrawerItem icon={<EditTwoToneIcon color='primary' />} text='Edit' onClick={on(editClick)} />}
				{isReplyable && <DrawerItem icon={<FormatQuoteTwoToneIcon color='secondary' />} text='Reply' onClick={on(replyClick)} />}
				<DrawerItem>
					<Reactions justify='between' flex={1}>
						{reactions.map(({ id, emoji }) => <div key={id} onClick={on(reactionClick(id))}>{emoji}</div>)}
					</Reactions>
				</DrawerItem>
			</DrawerList>
		</Drawer>
	)
}

export default MessageMenu
