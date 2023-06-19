import Drawer from '@/ui/Drawer'

import AppbarMenu from '@/core/Appbar/AppbarMenu'


function AppbarDrawer() {
	return (
		<Drawer data-testid='AppbarDrawer' name='appbar'>
			<AppbarMenu />
		</Drawer>
	)
}

export default AppbarDrawer
