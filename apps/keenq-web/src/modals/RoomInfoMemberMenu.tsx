import { useNavigate } from 'react-router-dom'

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import GppBadTwoToneIcon from '@mui/icons-material/GppBadTwoTone'
import LocalPoliceTwoToneIcon from '@mui/icons-material/LocalPoliceTwoTone'

import { useModal } from '@/services/modals'

import Drawer, { DrawerItem, DrawerList } from '@/ui/Drawer'

import { useCurrentMember } from '@/hooks/useCurrentMember'
import { useIsAdmin } from '@/hooks/useIsAdmin'


function RoomInfoMemberMenu() {
	const { uid: cuid } = useCurrentMember()

	const navigate = useNavigate()
	const { name, on, params } = useModal('roomInfoMember')
	const { uid } = params
	const profileClick = () => navigate(`/match/${uid}`)

	const currIsAdmin = useIsAdmin(cuid)
	const memberIsAdmin = useIsAdmin(uid)
	const isOwner = uid === '1'
	const isSelf = cuid === uid

	return (
		<Drawer data-testid='RoomInfoMemberMenu' name={name}>
			<DrawerList>
				{currIsAdmin && !isOwner && <DrawerItem icon={<DeleteTwoToneIcon color='error' />} text='Remove' />}
				{currIsAdmin && !memberIsAdmin && <DrawerItem icon={<LocalPoliceTwoToneIcon color='primary' />} text='Make Admin' />}
				{currIsAdmin && !isOwner &&memberIsAdmin && !isSelf && <DrawerItem icon={<GppBadTwoToneIcon color='secondary' />} text='Downgrade' />}
				<DrawerItem icon={<AccountCircleTwoToneIcon color='primary' />} text='Profile' onClick={on(profileClick)} />
			</DrawerList>
		</Drawer>
	)
}

export default RoomInfoMemberMenu
