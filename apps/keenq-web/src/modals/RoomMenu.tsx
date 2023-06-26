import { useNavigate, useParams } from 'react-router-dom'

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone'
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone'
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone'
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone'

import { useConfirm, useModal } from '@/services/modals'

import { Drawer, DrawerItem, DrawerList } from '@/ui/Drawer'
import { isPrivateRoom } from '@/model/room'



function RoomMenu() {
	const navigate = useNavigate()
	const { uid } = useParams()
	const room = useModal('room')
	const { onOpen: addMemberOpen } = useModal('addMemberToRoom')
	const { onOpen: reportOpen } = useModal('report')
	const { confirm } = useConfirm()

	const leaveClick = () => {
		confirm({
			title: 'Leave room',
			text: 'Are you sure you want to leave this room?',
			onConfirm: () => {
				// TODO: leave room
				room.onClose()
				navigate('/match')
			},
		})
	}

	const shareClick = () => {}

	const roomClick = () => navigate(`/roomInfo/${uid}`)
	const profileClick = () => navigate(`/match/${uid}`)

	const addMemberClick = () => addMemberOpen({ to: 'room', uid })

	const on = (fn: () => void) => () => {
		room.onClose()
		fn()
	}

	const isPrivate = isPrivateRoom(uid!)

	return (
		<Drawer data-testid='RoomMenu' {...room}>
			<DrawerList>
				<DrawerItem
					icon={<DeleteTwoToneIcon color='secondary' />}
					text='Leave'
					onClick={on(leaveClick)}
				/>
				<DrawerItem
					icon={<ReportTwoToneIcon color='error' />}
					text='Report'
					onClick={on(reportOpen)}
				/>
				{isPrivate ? (
					<DrawerItem
						icon={<ForumTwoToneIcon color='primary' />}
						text='Profile'
						onClick={on(profileClick)}
					/>
				) : (
					<DrawerItem
						icon={<ForumTwoToneIcon color='primary' />}
						text='Room'
						onClick={on(roomClick)}
					/>
				)}
				<DrawerItem
					icon={<PersonAddTwoToneIcon color='primary' />}
					text='Add member'
					onClick={on(addMemberClick)}
				/>
				<DrawerItem
					icon={<ShareTwoToneIcon color='primary' />}
					text='Share link'
					onClick={on(shareClick)}
				/>
			</DrawerList>
		</Drawer>
	)
}

export default RoomMenu
