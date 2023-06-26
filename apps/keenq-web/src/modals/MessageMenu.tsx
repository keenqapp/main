import styled from '@emotion/styled'
import { useNavigate, useParams } from 'react-router-dom'

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import FormatQuoteTwoToneIcon from '@mui/icons-material/FormatQuoteTwoTone'
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone'

import { useModal } from '@/services/modals'

import Drawer, { DrawerItem, DrawerList } from '@/ui/Drawer'
import Row from '@/ui/Row'

import { messageReplyOrEditUid } from '@/components/Room/RoomInput'

import { isAdmin, isAuthor } from '@/model/member'


const Reactions = styled(Row)`
	margin: 0 0.5rem;
	border-radius: 8px;
	padding: 1rem 1.5rem;
	box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`

const reactions = [
	{ uid: '7', emoji: '💩' },
	{ uid: '6', emoji: '👎' },
	{ uid: '5', emoji: '😄' },
	{ uid: '4', emoji: '️👍' },
	{ uid: '3', emoji: '🥰' },
	{ uid: '2', emoji: '🔥' },
	{ uid: '1', emoji: '❤️' },
]

function MessageMenu() {
	const navigate = useNavigate()
	const { name, params, on } = useModal('message')
	const { onOpen } = useModal('report')
	const { uid: ruid } = useParams()
	const { uid, authorUid } = params

	const reportClick = () => onOpen({ entity: 'message', uid })

	const profileClick = () => navigate(`/match/${authorUid}`)
	const deleteClick = () => {
		console.log('--- MessageMenu.tsx:23 -> deleteClick -> deleteClick', uid)
	}

	const replyClick = () => {
		messageReplyOrEditUid({ mode: 'reply', uid })
	}

	const editClick = () => {
		messageReplyOrEditUid({ mode: 'edit', uid })
	}

	const reactionClick = (uid: string) => () => {
		console.log('--- MessageMenu.tsx:61 -> reactionClick ->', uid)
	}

	const same = isAuthor(authorUid)
	const admin = isAdmin('me', ruid!)

	return (
		<Drawer data-testid='MessageMenu' name={name}>
			<DrawerList>
				<DrawerItem icon={<ReportTwoToneIcon color='error' />} text='Report' onClick={on(reportClick)} />
				{(same || admin) && <DrawerItem icon={<DeleteForeverTwoToneIcon color='warning' />} text='Delete' onClick={on(deleteClick)} />}
				{!same && <DrawerItem icon={<AccountCircleTwoToneIcon color='primary' />} text='Profile' onClick={on(profileClick)} />}
				{same && <DrawerItem icon={<EditTwoToneIcon color='primary' />} text='Edit' onClick={on(editClick)} />}
				<DrawerItem icon={<FormatQuoteTwoToneIcon color='secondary' />} text='Reply' onClick={on(replyClick)} />
				<DrawerItem>
					<Reactions justify='between' flex={1}>
						{reactions.map(({ uid, emoji }) => <div key={uid} onClick={on(reactionClick(uid))}>{emoji}</div>)}
					</Reactions>
				</DrawerItem>
			</DrawerList>
		</Drawer>
	)
}

export default MessageMenu
