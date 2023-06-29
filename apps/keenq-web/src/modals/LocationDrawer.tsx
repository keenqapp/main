import styled from '@emotion/styled'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import ExploreOffTwoToneIcon from '@mui/icons-material/ExploreOffTwoTone'
import ExploreTwoToneIcon from '@mui/icons-material/ExploreTwoTone'
import LocationCityTwoToneIcon from '@mui/icons-material/LocationCityTwoTone'
import NotListedLocationTwoToneIcon from '@mui/icons-material/NotListedLocationTwoTone'

import { usePosition } from '@/services/location'
import { useModal } from '@/services/modals'

import Card from '@/ui/Card'
import Drawer from '@/ui/Drawer'
import { DrawerItem, DrawerList } from '@/ui/Drawer'
import Space from '@/ui/Space'


const StyledCard = styled(Card)`
	flex: 1;
`


function LocationDrawer() {

	const { location, permission, onRequest } = usePosition()
	const { onClose, name } = useModal('location')
	const { onOpen: onCityOpen } = useModal('city')
	const { onOpen: onInstructionOpen } = useModal('permissionInstruction')

	const onRequestClick = () => {
		if (permission === 'denied') return onInstructionOpen()
		if (permission !== 'granted') return onRequest()
	}

	const onCurrentClick = () => {
		console.log('--- LocationDrawer.tsx:36 -> onCurrentClick ->', location)
	}

	const onClickCity = () => {
		onCityOpen()
		onClose()
	}

	return (
		<Drawer name={name} data-testid='LocationModal'>
			<DrawerList data-testid='ProfileLocationModal'>
				{permission === 'denied' && (
					<DrawerItem>
						<StyledCard color='secondary.veryLight' align='center'>
							<ExploreOffTwoToneIcon color='secondary' />
							<Space height={0.5} />
							<Typography variant='overline' textAlign='center'>You have denied to share location</Typography>
						</StyledCard>
					</DrawerItem>
				)}
				{permission !== 'granted' && (
					<DrawerItem>
						<Button
							variant='contained'
							startIcon={<NotListedLocationTwoToneIcon />}
							onClick={onRequestClick}
							fullWidth
						>Request permission</Button>
					</DrawerItem>
				)}
				<DrawerItem
					disabled={permission !== 'granted'}
					icon={<ExploreTwoToneIcon color='primary' />}
					text='Use your current location'
					subtext={location?.city}
					onClick={onCurrentClick}
				/>
				<DrawerItem
					icon={<LocationCityTwoToneIcon color='secondary' />}
					text='Choose a city'
					onClick={onClickCity}
				/>
			</DrawerList>
		</Drawer>
	)
}

export default LocationDrawer
