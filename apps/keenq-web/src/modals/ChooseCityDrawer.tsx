import styled from '@emotion/styled'

import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone'
import TextField from '@mui/material/TextField'

import { useModal } from '@/services/modals'

import Container from '@/ui/Container'
import Drawer, { DrawerItem } from '@/ui/Drawer'
import List from '@/ui/List'
import Space from '@/ui/Space'

import { useInput } from '@/hooks/useInput'


const StyledContainer = styled(Container)`
  height: calc(100vh - var(--vertical-space) * 4);
`

const CitiesList = styled(List<typeof citiesMock[number]>)`
  height: calc(100vh - var(--vertical-space) * 5 - 1rem);
`

const citiesMock = [
	{ uid: 'Moscow', name: 'Moscow', country: 'Russia' },
	{ uid: 'Saint-Petersburg', name: 'Saint-Petersburg', country: 'Russia' },
	{ uid: 'Tbilisi', name: 'Tbilisi', country: 'Georgia' },
	{ uid: 'Istanbul', name: 'Istanbul', country: 'Turkey' },
	{ uid: 'New-York', name: 'New York', country: 'USA' },
	{ uid: 'London', name: 'London', country: 'UK' },
	{ uid: 'Paris', name: 'Paris', country: 'France' },
	{ uid: 'Berlin', name: 'Berlin', country: 'Germany' },
	{ uid: 'Rome', name: 'Rome', country: 'Italy' },
	{ uid: 'Madrid', name: 'Madrid', country: 'Spain' },
	{ uid: 'Barcelona', name: 'Barcelona', country: 'Spain' },
	{ uid: 'Amsterdam', name: 'Amsterdam', country: 'Netherlands' },
	{ uid: 'Prague', name: 'Prague', country: 'Czech Republic' },
	{ uid: 'Vienna', name: 'Vienna', country: 'Austria' },
	{ uid: 'Tel-Aviv', name: 'Tel-Aviv', country: 'Israel' },
	{ uid: 'Haifa', name: 'Haifa', country: 'Israel' },
	{ uid: 'Dubai', name: 'Dubai', country: 'UAE' },
]

function CitiesListItem({ name, uid, country }: typeof citiesMock[number]) {
	const { onClose } = useModal('city')
	const onClick = () => {
		onClose()
		console.log('--- ChooseCityDrawer.tsx:34 -> onClick ->', uid)
	}

	return <DrawerItem text={name} subtext={country} onClick={onClick} />
}

function ChooseCityDrawer() {
	const drawer = useModal('city')

	const cityInput = useInput({
		label: 'Choose a city',
		variant: 'outlined',
		fullWidth: true,
		InputProps: {
			endAdornment: <ClearTwoToneIcon onClick={() => cityInput.onClear()} />,
		}
	})

	const data = citiesMock.filter(({ name }) => name.toLowerCase().includes(cityInput.value.toLowerCase()))

	return (
		<Drawer data-testid='ChooseCityDrawer' {...drawer}>
			<StyledContainer data-testid='ChooseCityDrawerContainer'>
				<TextField {...cityInput} />
				<Space />
				<CitiesList
					data={data}
					renderItem={CitiesListItem}
				/>
			</StyledContainer>
		</Drawer>
	)
}

export default ChooseCityDrawer
