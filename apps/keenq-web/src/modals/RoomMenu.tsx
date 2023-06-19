import { useNavigate } from 'react-router-dom'

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone'
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone'
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone'

import { useConfirm, useModal } from '@/services/modals'

import { Drawer, DrawerItem, DrawerList } from '@/ui/Drawer'


function RoomMenu() {
	const navigate = useNavigate()
	const room = useModal('room')
	const { onOpen: addMemberOpen } = useModal('addMember')
	const { onOpen: reportOpen } = useModal('report')
	const { confirm } = useConfirm()

	const leaveClick = () => {
		confirm({
			title: 'Leave room',
			text: 'Are you sure you want to leave this room?',
			onConfirm: () => {
				// TODO: leave room
				// HERE
				room.onClose()
				navigate('/match')
			},
		})
	}

	const shareClick = () => {}

	const profileClick = () => {}

	const on = (fn: () => void) => () => {
		room.onClose()
		fn()
	}

	return (
		<Drawer data-testid='RoomMenu' {...room}>
			<DrawerList>
				<DrawerItem
					icon={<ShareTwoToneIcon color='primary' />}
					text='Share link'
					onClick={on(shareClick)}
				/>
				<DrawerItem
					icon={<PersonAddTwoToneIcon color='primary' />}
					text='Add member'
					onClick={on(addMemberOpen)}
				/>
				<DrawerItem
					icon={<ReportTwoToneIcon color='primary' />}
					text='Show profile'
					onClick={on(profileClick)}
				/>
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
			</DrawerList>
		</Drawer>
	)
}

export default RoomMenu
