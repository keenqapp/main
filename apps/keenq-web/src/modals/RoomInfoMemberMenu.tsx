import { useNavigate } from 'react-router-dom'

import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone'
import CancelTwoToneIcon from '@mui/icons-material/CancelTwoTone'
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone'
import GppBadTwoToneIcon from '@mui/icons-material/GppBadTwoTone'
import LocalPoliceTwoToneIcon from '@mui/icons-material/LocalPoliceTwoTone'

import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { useCurrentMember } from '@/model/member/hooks'
import { deleteallmsgsgql } from '@/model/message'
import { useCurrentRoom } from '@/model/room'
import { $isBanned, leaveroom, updateroommember } from '@/model/rooms_members'

import Drawer, { DrawerItem, DrawerList } from '@/ui/Drawer'

import { useMutation } from '@/hooks/gql'
import { useIsAdmin, useIsOwner } from '@/hooks/useIsAdmin'


function RoomInfoMemberMenu() {
	const { t } = useTranslate()
	const { id: cid } = useCurrentMember()
	const { id: rid, isOwner, isAdmin, allMembers } = useCurrentRoom()

	const navigate = useNavigate()
	const { name, on, params } = useModal('roomInfoMember')
	const { id } = params
	const [ , update ] = useMutation(updateroommember)
	const [ , deleteAllMsgs ] = useMutation(deleteallmsgsgql)
	const [ , _remove ] = useMutation(leaveroom)
	const profileClick = () => navigate(`/match/${id}`)

	const memberIsAdmin = useIsAdmin(id)
	const memberIsOwner = useIsOwner(id)
	const isSelf = cid === id
	const isBanned = $isBanned(id, allMembers)

	function canRemove() {
		if (isSelf) return false
		if (memberIsOwner) return false
		if (isOwner) return true
		if (isAdmin && !memberIsAdmin) return true
		return false
	}

	function canUnban() {
		if (isSelf) return false
		if ((isAdmin || isOwner) && isBanned) return true
	}

	function canPromote() {
		if (isSelf) return false
		if (memberIsOwner) return false
		if (isBanned) return false
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

	const ban = () => {
		update({ roomId: rid, memberId: id, role: 'banned' })
		deleteAllMsgs({ roomId: rid, authorId: id })
	}

	const unban = () => update({ roomId: rid, memberId: id, role: 'member' })

	const remove = () => _remove({ roomId: rid, memberId: id, deletedAt: new Date().toISOString() })

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
				{canUnban() && isBanned && (
					<DrawerItem icon={<CancelTwoToneIcon color='primary' />} text={t`room.unban`} onClick={on(unban)} />
				)}
				{canRemove() && !isBanned && (
					<DrawerItem icon={<CancelTwoToneIcon color='error' />} text={t`room.ban`} onClick={on(ban)} />
				)}
				{canRemove() && (
					<DrawerItem icon={<DeleteTwoToneIcon color='warning' />} text={t`room.remove`} onClick={on(remove)} />
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
