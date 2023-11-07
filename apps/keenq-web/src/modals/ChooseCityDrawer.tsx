import styled from '@emotion/styled'

import TextField from '@mui/material/TextField'

import ClearTwoToneIcon from '@mui/icons-material/ClearTwoTone'

import { ICity, useCitySearch } from '@/services/location'
import { useModal } from '@/services/modals'
import { useTranslate } from '@/services/translate'

import { updatemembergql } from '@/model/member'
import { useCurrentMember } from '@/model/member/hooks'

import Container from '@/ui/Container'
import Drawer, { DrawerItem } from '@/ui/Drawer'
import List from '@/ui/List'
import Space from '@/ui/Space'
import Stack from '@/ui/Stack'

import json from '@/assets/cities.json'
import Loading from '@/core/Loading'
import { useUpdate } from '@/hooks/gql'
import { useInput } from '@/hooks/useInput'


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
		id: description,
		name: structured_formatting.main_text,
		country: structured_formatting.secondary_text,
	}
}

function CitiesListItem(city: typeof json[number]) {
	const { name, country, latitude, longitude } = city
	const { on } = useModal('city')
	const { id } = useCurrentMember()
	const [ _, update ] = useUpdate(updatemembergql)

	const click = () => {
		const location = {
			country,
			city: name,
			longitude,
			latitude,
			timestamp: new Date().toISOString()
		}
		const point = {
			type: 'Point',
			coordinates: [longitude, latitude]
		}
		update(id, { location, point })
	}

	return <DrawerItem text={name} subtext={country} onClick={on(click)} />
}

function ChooseCityDrawer() {
	const { t } = useTranslate()
	const { name } = useModal('city')

	const cityInput = useInput({
		label: t`location.chooseCity`,
		variant: 'outlined',
		fullWidth: true,
		InputProps: {
			endAdornment: <ClearTwoToneIcon onClick={() => cityInput.onClear()} />,
		}
	})

	const { data, fetching } = useCitySearch(cityInput.value)
	const cities = data.length > 0
		? data.map(toCity)
		: json
			.filter(({ name }) => name.toLowerCase().includes(cityInput.value.toLowerCase()))
			.map(city => ({ ...city, name: t('cities.' + city.name), country: t('countries.' + city.country) }))

	return (
		<Drawer data-testid='ChooseCityDrawer' name={name}>
			<StyledContainer data-testid='ChooseCityDrawerContainer'>
				<TextField {...cityInput} />
				<Space />
				{fetching && <Stack justify='center'><Loading /></Stack>}
				<CitiesList
					data={cities}
					render={CitiesListItem}
				/>
			</StyledContainer>
		</Drawer>
	)
}

export default ChooseCityDrawer
