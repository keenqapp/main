import { useNavigate } from 'react-router-dom'

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import GppBadTwoToneIcon from '@mui/icons-material/GppBadTwoTone'
import LocalPoliceTwoToneIcon from '@mui/icons-material/LocalPoliceTwoTone'

import { useModal } from '@/services/modals'

import { useCurrentMember } from '@/model/member/hooks'
import { useCurrentRoom } from '@/model/room'
import { undateroommember } from '@/model/rooms_members'

import Drawer, { DrawerItem, DrawerList } from '@/ui/Drawer'

import { useMutation } from '@/hooks/gql'
import { useIsAdmin, useIsOwner } from '@/hooks/useIsAdmin'
import { useTranslate } from '@/services/translate'


function RoomInfoMemberMenu() {
	const { t } = useTranslate()
	const { id: cid } = useCurrentMember()
	const { id: rid, isOwner, isAdmin } = useCurrentRoom()

	const navigate = useNavigate()
	const { name, on, params } = useModal('roomInfoMember')
	const { id } = params
	const [ , update ] = useMutation(undateroommember)
	const profileClick = () => navigate(`/match/${id}`)

	const memberIsAdmin = useIsAdmin(id)
	const memberIsOwner = useIsOwner(id)
	const isSelf = cid === id

	function canRemove() {
		if (isSelf) return false
		if (memberIsOwner) return false
		if (isOwner) return true
		if (isAdmin && !memberIsAdmin) return true
		return false
	}

	function canPromote() {
		if (isSelf) return false
		if (memberIsOwner) return false
		if (isOwner) return true
		if (isAdmin && !memberIsOwner && !memberIsAdmin) return true
		return false
	}

	function canDowngrade() {
		if (isSelf) return false
		if (isOwner && memberIsOwner) return true
		if (memberIsOwner) return false
		if (isOwner && memberIsAdmin) return true
		if (isAdmin && !memberIsOwner && memberIsAdmin) return true
		return false
	}

	const ban = () => update({ roomId: rid, memberId: id, role: 'banned' })

	const promote = () => {
		if (memberIsAdmin) return update({ roomId: rid, memberId: id, role: 'owner' })
		if (!memberIsAdmin) return update({ roomId: rid, memberId: id, role: 'admin' })
	}

	const downgrade = () => {
		if (memberIsOwner) return update({ roomId: rid, memberId: id, role: 'admin' })
		if (memberIsAdmin) return update({ roomId: rid, memberId: id, role: 'member' })
	}

	return (
		<Drawer data-testid='RoomInfoMemberMenu' name={name}>
			<DrawerList>
				{canRemove() && (
					<DrawerItem icon={<DeleteTwoToneIcon color='error' />} text={t`room.ban`} onClick={on(ban)} />
				)}
				{canPromote() && (
					<DrawerItem icon={<LocalPoliceTwoToneIcon color='primary' />} text={memberIsAdmin ? t`room.makeOwner` : t`room.makeAdmin`} onClick={on(promote)} />
				)}
				{canDowngrade() && (
					<DrawerItem icon={<GppBadTwoToneIcon color='secondary' />} text={t`room.downgrade`} onClick={on(downgrade)} />
				)}
				<DrawerItem icon={<AccountCircleTwoToneIcon color='primary' />} text={t`profile.profile`} onClick={on(profileClick)} />
			</DrawerList>
		</Drawer>
	)
}

export default RoomInfoMemberMenu
