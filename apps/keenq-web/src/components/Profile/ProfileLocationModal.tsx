import ExploreTwoToneIcon from '@mui/icons-material/ExploreTwoTone'
import LocationCityTwoToneIcon from '@mui/icons-material/LocationCityTwoTone'

import { usePosition } from '@/services/location'
import { useModal } from '@/services/modals'

import { DrawerItem, DrawerList } from '@/ui/Drawer'


function ProfileLocationModal() {

	const { status, position } = usePosition()
	const { onOpen } = useModal('city')
	const { onClose } = useModal('location')

	const onClick = () => {
		console.log('--- ProfileLocationModal.tsx:19 -> onClick ->', 111)
	}

	const onClickCity = () => {
		onOpen()
		onClose()
	}

	return (
		<DrawerList data-testid='ProfileLocationModal'>
			<DrawerItem
				icon={<ExploreTwoToneIcon color='primary' />}
				text='Use your current location'
				subtext={position?.city}
				onClick={onClick}
			/>
			<DrawerItem
				icon={<LocationCityTwoToneIcon color='secondary' />}
				text='Choose a city'
				onClick={onClickCity}
			/>
		</DrawerList>
	)
}

export default ProfileLocationModal
