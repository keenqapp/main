import { useModal } from '@/services/modals'

import Drawer from '@/ui/Drawer'
import { DrawerItem, DrawerList } from '@/ui/Drawer'
import TextField from '@mui/material/TextField'


const genders = ['Male', 'Female', 'Non Binary', 'Agender']

function GenderDrawer() {
	const { on } = useModal('gender')

	const genderClick = (gender: string) => () => {
		console.log('--- GenderDrawer.tsx:18 ->  ->', gender)
	}

	return (
		<Drawer
			name='gender'
			data-testid='GenderDrawer'
		>
			<DrawerList data-testid='ProfileLocationModal'>
				{genders.map(gender => (
					<DrawerItem
						key={gender}
						text={gender}
						onClick={on(genderClick(gender))}
					/>
				))}
				<DrawerItem>
					<TextField />
				</DrawerItem>
			</DrawerList>
		</Drawer>
	)
}

export default GenderDrawer
