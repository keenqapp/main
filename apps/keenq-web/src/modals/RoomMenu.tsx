import { useNavigate, useParams } from 'react-router-dom'

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone'
import NotificationsOffTwoToneIcon from '@mui/icons-material/NotificationsOffTwoTone'
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone'
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone'
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone'

import { useConfirm, useModal } from '@/services/modals'

import { Drawer, DrawerItem, DrawerList } from '@/ui/Drawer'

import { $isPrivate, getRoomById } from '@/model/room'


function RoomMenu() {
	const navigate = useNavigate()
	const { id } = useParams()
	const { name, on } = useModal('room')
	const { onOpen: addMemberOpen } = useModal('addMemberToRoom')
	const { onOpen: reportOpen } = useModal('report')
	const { confirm } = useConfirm()

	const leaveClick = () => {
		confirm({
			title: 'Leave room',
			text: 'Are you sure you want to leave this room?',
			onConfirm: on(() => navigate('/match'))
		})
	}

	const shareClick = () => {}

	const roomClick = () => navigate(`/room/${id}/info`)
	const profileClick = () => navigate(`/match/${id}`)

	const addMemberClick = () => addMemberOpen({ to: 'room', id })

	const muteClick = () => {
		console.log('--- RoomMenu.tsx:44 -> muteClick ->', 'muteClick')
	}

	const room = getRoomById(id!)
	const isPrivate = $isPrivate(room)

	return (
		<Drawer data-testid='RoomMenu' name={name}>
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
				<DrawerItem
					icon={<NotificationsOffTwoToneIcon color='secondary' />}
					text='Mute'
					onClick={on(muteClick)}
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
