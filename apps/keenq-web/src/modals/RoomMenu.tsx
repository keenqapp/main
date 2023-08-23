import { useNavigate } from 'react-router-dom'

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
// import NotificationsOffTwoToneIcon from '@mui/icons-material/NotificationsOffTwoTone'
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone'
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone'
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone'

import { useConfirm, useModal } from '@/services/modals'

import { useCurrentMember } from '@/model/member'
import { removeroomgql, useCurrentRoom } from '@/model/room'
import { leaveroom } from '@/model/rooms_members'

import { Drawer, DrawerItem, DrawerList } from '@/ui/Drawer'

import { useMutation } from '@/hooks/gql/useMutation'


function RoomMenu() {
	const navigate = useNavigate()
	const { name, on } = useModal('room')
	const { onOpen: addMemberOpen } = useModal('addMemberToRoom')
	const { open: openReport } = useModal('report')
	const { confirm } = useConfirm()
	const { id: memberId } = useCurrentMember()
	const { id, isMember, isPersonal, isOwner } = useCurrentRoom()

	const [ , leave ] = useMutation(leaveroom)
	const [ , remove ] = useMutation(removeroomgql)

	const leaveClick = () => {
		confirm({
			title: 'Leave room',
			text: 'Are you sure you want to leave this room?',
			onConfirm: on(() => {
				leave({ memberId, roomId: id })
				navigate('/match')
			})
		})
	}

	const shareClick = () => {}

	const roomClick = () => navigate(`/room/${id}/info`)
	const profileClick = () => navigate(`/match/${id}`)

	const report = () => openReport({ id, entity: 'room' })

	const addMemberClick = () => addMemberOpen({ to: 'room', id })

	const deleteClick = () => {
		confirm({
			title: 'Delete room',
			text: 'Are you sure you want to delete this room?',
			onConfirm: on(() => {
				remove({ id, deletedAt: new Date().toISOString() })
			})
		})
	}

	// const muteClick = () => {
	// 	console.log('--- RoomMenu.tsx:44 -> muteClick ->', 'muteClick')
	// }

	return (
		<Drawer data-testid='RoomMenu' name={name}>
			<DrawerList>
				{isOwner && (
					<DrawerItem
						icon={<HighlightOffTwoToneIcon color='error' />}
						text='Delete'
						onClick={on(deleteClick)}
					/>
				)}
				{isMember && (
					<DrawerItem
						icon={<DeleteTwoToneIcon color='secondary' />}
						text='Leave'
						onClick={on(leaveClick)}
					/>
				)}
				<DrawerItem
					icon={<ReportTwoToneIcon color='error' />}
					text='Report'
					onClick={report}
				/>
				{/*<DrawerItem*/}
				{/*	icon={<NotificationsOffTwoToneIcon color='secondary' />}*/}
				{/*	text='Mute'*/}
				{/*	onClick={on(muteClick)}*/}
				{/*/>*/}
				{isPersonal ? (
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
