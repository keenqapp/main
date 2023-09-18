import styled from '@emotion/styled'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import ExploreOffTwoToneIcon from '@mui/icons-material/ExploreOffTwoTone'
import ExploreTwoToneIcon from '@mui/icons-material/ExploreTwoTone'
import LocationCityTwoToneIcon from '@mui/icons-material/LocationCityTwoTone'
import NotListedLocationTwoToneIcon from '@mui/icons-material/NotListedLocationTwoTone'

import { usePosition } from '@/services/location'
import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { updatemembergql, useCurrentMember } from '@/model/member'

import Card from '@/ui/Card'
import Drawer from '@/ui/Drawer'
import { DrawerItem, DrawerList } from '@/ui/Drawer'
import Space from '@/ui/Space'

import { useUpdate } from '@/hooks/gql'


const StyledCard = styled(Card)`
	flex: 1;
`

function LocationDrawer() {

	const { t } = useTranslate('location')

	const { id } = useCurrentMember()
	const { position, permission, getPointAndLocation, onRequest } = usePosition()
	const { close, name } = useModal('location')
	const { open: onCityOpen } = useModal('city')
	const { open: onInstructionOpen } = useModal('permissionInstruction')
	const [ _, update ] = useUpdate(updatemembergql)

	const onRequestClick = () => {
		if (permission === 'denied') return onInstructionOpen()
		if (permission !== 'granted') return onRequest()
	}

	const onCurrentClick = () => {
		if (!position || permission !== 'granted') return
		const pl = getPointAndLocation()
		update(id, pl)
	}

	const onClickCity = () => {
		onCityOpen()
		close()
	}

	return (
		<Drawer name={name} data-testid='LocationModal'>
			<DrawerList data-testid='ProfileLocationModal'>
				{permission === 'denied' && (
					<DrawerItem>
						<StyledCard color='secondary.veryLight' align='center'>
							<ExploreOffTwoToneIcon color='secondary' />
							<Space height={0.5} />
							<Typography variant='overline' textAlign='center'>{t`denied`}</Typography>
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
						>{t`request`}</Button>
					</DrawerItem>
				)}
				<DrawerItem
					disabled={permission !== 'granted'}
					icon={<ExploreTwoToneIcon color='primary' />}
					text={t`useCurrent`}
					subtext={position?.city}
					onClick={onCurrentClick}
				/>
				<DrawerItem
					disabled={permission === 'granted'}
					icon={<LocationCityTwoToneIcon color='secondary' />}
					text={t`chooseCity`}
					onClick={onClickCity}
				/>
			</DrawerList>
		</Drawer>
	)
}

export default LocationDrawer
