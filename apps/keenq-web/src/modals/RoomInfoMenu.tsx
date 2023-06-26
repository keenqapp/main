import { useParams } from 'react-router-dom'

import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone'
import VerifiedTwoToneIcon from '@mui/icons-material/VerifiedTwoTone'

import { useConfirm, useModal } from '@/services/modals'

import Drawer, { DrawerItem, DrawerList } from '@/ui/Drawer'


function RoomInfoMenu() {
	const { uid } = useParams()
	const { name, on } = useModal('roomInfo')
	const { confirm } = useConfirm()

	const onDeleteClick = () => {
		confirm({
			title: 'Delete room',
			text: 'Are you sure you want to delete this room?',
			onConfirm: on(() => { console.log('--- RoomInfoMenu.tsx:18 ->  ->', 'del', uid) })
		})
	}

	const verifyClick = () => {}

	return (
		<Drawer data-testid='RoomInfoMenu' name={name}>
			<DrawerList>
				<DrawerItem icon={<DeleteForeverTwoToneIcon color='error' />} text='Delete' onClick={onDeleteClick} />
				<DrawerItem icon={<VerifiedTwoToneIcon color='primary' />} text='Request verification' onClick={on(verifyClick)} />
			</DrawerList>
		</Drawer>
	)
}

export default RoomInfoMenu
