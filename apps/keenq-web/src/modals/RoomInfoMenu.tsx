import { useNavigate, useParams } from 'react-router-dom'

import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone'

import { useConfirm, useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { removeroomgql, useCurrentRoom } from '@/model/room'

import Drawer, { DrawerItem, DrawerList } from '@/ui/Drawer'

import { useMutation } from '@/hooks/gql'


function RoomInfoMenu() {
	const { t } = useTranslate()
	const navigate = useNavigate()
	const { id } = useParams()
	const { name, on } = useModal('roomInfo')
	const { confirm } = useConfirm()
	const { isOwner } = useCurrentRoom()
	const [ , remove ] = useMutation(removeroomgql)

	const onDeleteClick = () => {
		confirm({
			title: t`room.deleteTitle`,
			text: t`room.deleteText`,
			onConfirm: on(() => {
				remove({ id })
				navigate('/room')
			})
		})
	}

	const verifyClick = () => {}

	return (
		<Drawer data-testid='RoomInfoMenu' name={name}>
			<DrawerList>
				{isOwner && <DrawerItem icon={<DeleteForeverTwoToneIcon color='error' />} text={t`words.delete`} onClick={onDeleteClick} />}
				{isOwner && <DrawerItem icon={<VerifiedTwoToneIcon color='primary' />} text={t`room.verification`} onClick={on(verifyClick)} />}
			</DrawerList>
		</Drawer>
	)
}

export default RoomInfoMenu
