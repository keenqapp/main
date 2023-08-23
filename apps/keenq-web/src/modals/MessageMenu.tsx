import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import FormatQuoteTwoToneIcon from '@mui/icons-material/FormatQuoteTwoTone'
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone'

import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { useIsAuthor } from '@/model/member'
import { useCurrentMember } from '@/model/member/hooks'
import { deletemessagegql, IMessageReaction, updatereactiongql } from '@/model/message'
import { $isChannel, useCurrentRoom } from '@/model/room'

import Drawer, { DrawerItem, DrawerList } from '@/ui/Drawer'
import Row from '@/ui/Row'
import theme from '@/ui/theme'

import { $messageReplyOrEditId } from '@/components/Room/RoomInput/state'

import { useMutation, useUpdate } from '@/hooks/gql'


const Reactions = styled(Row)`
	margin: 0 0.5rem;
	border-radius: 8px;
	padding: 0.2rem 0;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`

const StyledReaction = styled.div`
	${p => p.isSelected && `background: ${theme.color.primaryLight};` };
	padding: 0.5rem;
  border-radius: 8px;
`

const allreactions = [
	{ id: '7', emoji: '💩' },
	{ id: '6', emoji: '👎' },
	{ id: '5', emoji: '😄' },
	{ id: '4', emoji: '️👍' },
	{ id: '3', emoji: '🥰' },
	{ id: '2', emoji: '🔥' },
	{ id: '1', emoji: '❤️' },
]

function Reaction({ id, emoji, isSelected, onClick }: any) {
	const click = () => {
		console.log('--- MessageMenu.tsx:52 -> click ->', 111, id, emoji, onClick)
		onClick(id, emoji)
	}
	return <StyledReaction isSelected={isSelected} onClick={click}>{emoji}</StyledReaction>
}

function MessageMenu() {
	const { t } = useTranslate()
	const navigate = useNavigate()
	const { id: mid } = useCurrentMember()
	const { name, params, close, on } = useModal('message')
	const { open } = useModal('report')
	const { id, authorId, reactions } = params
	const { room, isAdmin } = useCurrentRoom()
	const { id: rid } = room
	const [ , remove ] = useMutation(deletemessagegql)
	const [ , update ] = useUpdate(updatereactiongql)

	const reportClick = () => {
		close()
		open({ entity: 'message', id })
	}

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

	const selectedId = reactions?.find(r => r.authorId === mid)?.id

	const reactionClick = (rid: string, emoji: string) => {
		const isSame = selectedId === rid
		const next = reactions.filter(r => r.authorId !== mid)
		const reaction = {
			id: rid,
			emoji,
			authorId: mid,
		} as IMessageReaction
		if (!isSame) next.push(reaction)
		update(id, { reactions: next })
		close()
	}

	const isAuthor = useIsAuthor(authorId)
	const isChannel = $isChannel(room)

	const isEditable = (!isChannel && isAuthor) || (isChannel && isAdmin)
	const isReplyable = !isChannel || (isChannel && isAdmin)

	return (
		<Drawer data-testid='MessageMenu' name={name}>
			<DrawerList>
				<DrawerItem icon={<ReportTwoToneIcon color='error' />} text={t`report.report`} onClick={reportClick} />
				{(isAuthor || isAdmin) && <DrawerItem icon={<DeleteForeverTwoToneIcon color='warning' />} text={t`words.delete`} onClick={on(deleteClick)} />}
				{!isAuthor && !isChannel && <DrawerItem icon={<AccountCircleTwoToneIcon color='primary' />} text={t`profile.profile`} onClick={on(profileClick)} />}
				{isChannel && <DrawerItem icon={<AccountCircleTwoToneIcon color='primary' />} text={t`room.room`} onClick={on(roomClick)} />}
				{isEditable && <DrawerItem icon={<EditTwoToneIcon color='primary' />} text={t`words.edit`} onClick={on(editClick)} />}
				{isReplyable && <DrawerItem icon={<FormatQuoteTwoToneIcon color='secondary' />} text={t`messages.reply`} onClick={on(replyClick)} />}
				<DrawerItem>
					<Reactions justify='between' flex={1}>
						{allreactions.map(({ id, emoji }) => (
							<Reaction
								key={id}
								id={id}
								emoji={emoji}
								isSelected={selectedId == id}
								onClick={reactionClick}
							/>
						))}
					</Reactions>
				</DrawerItem>
			</DrawerList>
		</Drawer>
	)
}

export default MessageMenu
