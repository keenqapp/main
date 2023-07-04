import styled from '@emotion/styled'

import TextField from '@mui/material/TextField'

import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone'

import { ICity, useCitySearch } from '@/services/location'
import { useModal } from '@/services/modals'

import Container from '@/ui/Container'
import Drawer, { DrawerItem } from '@/ui/Drawer'
import List from '@/ui/List'
import Row from '@/ui/Row'
import Space from '@/ui/Space'

import json from '@/assets/cities.json'
import Loading from '@/core/Loading'
import { useUpdate } from '@/hooks/gql'
import { useCurrentMember } from '@/hooks/useCurrentMember'
import { useInput } from '@/hooks/useInput'
import { updategql } from '@/model/member'


const StyledContainer = styled(Container)`
  height: calc(100vh - var(--vertical-space) * 4);
	display: flex;
	flex-direction: column;
`

const CitiesList = styled(List<typeof json[number]>)`
  height: calc(100vh - var(--vertical-space) * 5 - 1rem);
`

function toCity({ description, structured_formatting }: ICity) {
	return {
		uid: description,
		name: structured_formatting.main_text,
		country: structured_formatting.secondary_text,
	}
}

function CitiesListItem(city: typeof json[number]) {
	const { name, country, latitude, longitude } = city
	const { on } = useModal('city')
	const { uid } = useCurrentMember()
	const [ _, update ] = useUpdate(updategql)

	const click = () => {
		const data = {
			location: {
				country,
				city: name,
				longitude,
				latitude,
				timestamp: new Date().toISOString()
			}
		}
		update(uid, { data })
	}

	return <DrawerItem text={name} subtext={country} onClick={on(click)} />
}

function ChooseCityDrawer() {
	const { name } = useModal('city')

	const cityInput = useInput({
		label: 'Choose a city',
		variant: 'outlined',
		fullWidth: true,
		InputProps: {
			endAdornment: <ClearTwoToneIcon onClick={() => cityInput.onClear()} />,
		}
	})

	const { data, fetching } = useCitySearch(cityInput.value)
	const cities = data.length > 0
		? data.map(toCity)
		: json.filter(({ name }) => name.toLowerCase().includes(cityInput.value.toLowerCase()))

	return (
		<Drawer data-testid='ChooseCityDrawer' name={name}>
			<StyledContainer data-testid='ChooseCityDrawerContainer'>
				<TextField {...cityInput} />
				<Space />
				{fetching && <Row justify='center'><Loading /></Row>}
				<CitiesList
					data={cities}
					render={CitiesListItem}
				/>
			</StyledContainer>
		</Drawer>
	)
}

export default ChooseCityDrawer
