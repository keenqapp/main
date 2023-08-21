import { useStore } from '@nanostores/preact'

import Switch from '@mui/material/Switch'

import FolderCopyTwoToneIcon from '@mui/icons-material/FolderCopyTwoTone'
import MapsUgcTwoToneIcon from '@mui/icons-material/MapsUgcTwoTone'

import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { Drawer, DrawerItem, DrawerList } from '@/ui/Drawer'

import { $showTabs } from '@/components/Rooms/store'


function RoomsMenu() {
	const { t } = useTranslate('rooms')
	const { name, on } = useModal('rooms')
	const { onOpen } = useModal('createRoom')
	const showTabs = useStore($showTabs)
	const tabs = () => $showTabs.set(!$showTabs.get())

	return (
		<Drawer data-testid='RoomsMenu' name={name}>
			<DrawerList>
				<DrawerItem
					icon={<FolderCopyTwoToneIcon color='primary' />}
					text={t`toggle`}
					action={<Switch onChange={tabs} checked={showTabs || false} />}
				/>
			</DrawerList>
			<DrawerList>
				<DrawerItem icon={<MapsUgcTwoToneIcon color='primary' />} text={t`create`} onClick={on(onOpen)} />
			</DrawerList>
		</Drawer>
	)
}

export default RoomsMenu
