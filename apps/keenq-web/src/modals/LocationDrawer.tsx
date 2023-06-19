import Drawer from '@/ui/Drawer'

import ProfileLocationModal from '@/components/Profile/ProfileLocationModal'


function LocationDrawer() {
	return (
		<Drawer
			name='location'
			data-testid='LocationModal'
		>
			<ProfileLocationModal />
		</Drawer>
	)
}

export default LocationDrawer
