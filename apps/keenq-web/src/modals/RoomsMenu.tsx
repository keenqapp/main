import MapsUgcTwoToneIcon from '@mui/icons-material/MapsUgcTwoTone'

import { useModal } from '@/services/modals'

import { Drawer, DrawerItem, DrawerList } from '@/ui/Drawer'


function RoomsMenu() {
	const { name, on } = useModal('rooms')
	const { onOpen } = useModal('createRoom')
	return (
		<Drawer data-testid='RoomsMenu' name={name}>
			<DrawerList>
				<DrawerItem icon={<MapsUgcTwoToneIcon color='primary' />} text='Create room' onClick={on(onOpen)} />
			</DrawerList>
		</Drawer>
	)
}

export default RoomsMenu
