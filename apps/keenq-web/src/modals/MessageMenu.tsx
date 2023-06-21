import { useNavigate, useParams } from 'react-router-dom'

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import FormatQuoteTwoToneIcon from '@mui/icons-material/FormatQuoteTwoTone';

import { useModal } from '@/services/modals'

import Drawer, { DrawerItem, DrawerList } from '@/ui/Drawer'

import { isAdmin, isAuthor } from '@/components/Room/RoomMessage/utils'


function MessageMenu() {
	const navigate = useNavigate()
	const { name, params, on } = useModal('message')
	const { uid: ruid } = useParams()
	const { uid, authorUid } = params?.[0] || {}

	const profileClick = () => navigate(`/match/${authorUid}`)
	const deleteClick = () => {
		console.log('--- MessageMenu.tsx:23 -> deleteClick -> deleteClick', uid)
	}

	const editClick = () => {
		console.log('--- MessageMenu.tsx:27 -> onEditClick ->', uid)
	}

	const same = isAuthor(authorUid)
	const admin = isAdmin('me', ruid!)

	return (
		<Drawer data-testid='MessageMenu' name={name}>
			<DrawerList>
				{!same && <DrawerItem icon={<AccountCircleTwoToneIcon color='primary' />} text='Profile' onClick={on(profileClick)} />}
				{(same || admin) && <DrawerItem icon={<DeleteForeverTwoToneIcon color='warning' />} text='Delete' onClick={on(deleteClick)} />}
				<DrawerItem icon={<FormatQuoteTwoToneIcon color='secondary' />} text='Reply' />
				{same && <DrawerItem icon={<EditTwoToneIcon color='primary' />} text='Edit' onClick={on(editClick)} />}
			</DrawerList>
		</Drawer>
	)
}

export default MessageMenu
