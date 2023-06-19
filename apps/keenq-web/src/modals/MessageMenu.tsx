import { useNavigate, useParams } from 'react-router-dom'

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'

import { useModal } from '@/services/modals'

import Drawer, { DrawerItem, DrawerList } from '@/ui/Drawer'

import { isAdmin, isAuthor } from '@/components/Room/RoomMessage/utils'


function MessageMenu() {
	const navigate = useNavigate()
	const modal = useModal('message')
	const { uid: ruid } = useParams()
	const { authorUid } = modal.params?.[0] || {}

	const onProfileClick = () => navigate(`/match/${authorUid}`)
	const onDeleteClick = () => {
		console.log('--- MessageMenu.tsx:13 -> onDeleteClick ->', modal.params)
	}

	const onEditClick = () => {
		console.log('--- MessageMenu.tsx:17 -> onEditClick ->', modal)
	}

	const same = isAuthor(authorUid)
	const admin = isAdmin('me', ruid!)

	return (
		<Drawer data-testid='MessageMenu' {...modal}>
			<DrawerList>
				{!same && <DrawerItem icon={<AccountCircleTwoToneIcon color='primary' />} text='Профиль' onClick={onProfileClick} />}
				{(same || admin) && <DrawerItem icon={<DeleteForeverTwoToneIcon color='warning' />} text='Delete' onClick={onDeleteClick} />}
				{same && <DrawerItem icon={<EditTwoToneIcon color='primary' />} text='Edit' onClick={onEditClick} />}
			</DrawerList>
		</Drawer>
	)
}

export default MessageMenu
