import { useNavigate } from 'react-router-dom'

import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone'
import HighlightOffTwoToneIcon from '@mui/icons-material/HighlightOffTwoTone'
// import NotificationsOffTwoToneIcon from '@mui/icons-material/NotificationsOffTwoTone'
import PersonAddTwoToneIcon from '@mui/icons-material/PersonAddTwoTone'
import ReportTwoToneIcon from '@mui/icons-material/ReportTwoTone'
import ShareTwoToneIcon from '@mui/icons-material/ShareTwoTone'

import { useConfirm, useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { useCurrentMember } from '@/model/member'
import { removeroomgql, useCurrentRoom } from '@/model/room'
import { leaveroom } from '@/model/rooms_members'

import { Drawer, DrawerItem, DrawerList } from '@/ui/Drawer'

import { useMutation } from '@/hooks/gql/useMutation'


function RoomMenu() {
	const { t } = useTranslate()
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
			title: t`room.leaveTitle`,
			text: t`room.leaveTitle`,
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
			title: t`room.deleteTitle`,
			text: t`room.deleteText`,
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
						text={t`words.delete`}
						onClick={on(deleteClick)}
					/>
				)}
				{isMember && (
					<DrawerItem
						icon={<DeleteTwoToneIcon color='secondary' />}
						text={t`room.leave`}
						onClick={on(leaveClick)}
					/>
				)}
				<DrawerItem
					icon={<ReportTwoToneIcon color='error' />}
					text={t`report.report`}
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
						text={t`profile.profile`}
						onClick={on(profileClick)}
					/>
				) : (
					<DrawerItem
						icon={<ForumTwoToneIcon color='primary' />}
						text={t`room.room`}
						onClick={on(roomClick)}
					/>
				)}
				<DrawerItem
					icon={<PersonAddTwoToneIcon color='primary' />}
					text={t`member.add`}
					onClick={on(addMemberClick)}
				/>
				<DrawerItem
					icon={<ShareTwoToneIcon color='primary' />}
					text={t`room.share`}
					onClick={on(shareClick)}
				/>
			</DrawerList>
		</Drawer>
	)
}

export default RoomMenu
