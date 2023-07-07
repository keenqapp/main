import { useNavigate } from 'react-router-dom'

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import GppBadTwoToneIcon from '@mui/icons-material/GppBadTwoTone'
import LocalPoliceTwoToneIcon from '@mui/icons-material/LocalPoliceTwoTone'

import { useModal } from '@/services/modals'

import Drawer, { DrawerItem, DrawerList } from '@/ui/Drawer'

import { useCurrentMember } from '@/model/member/hooks'
import { useIsAdmin } from '@/hooks/useIsAdmin'


function RoomInfoMemberMenu() {
	const { id: cid } = useCurrentMember()

	const navigate = useNavigate()
	const { name, on, params } = useModal('roomInfoMember')
	const { id } = params
	const profileClick = () => navigate(`/match/${id}`)

	const currIsAdmin = useIsAdmin(cid)
	const memberIsAdmin = useIsAdmin(id)
	const isOwner = id === '1'
	const isSelf = cid === id

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
