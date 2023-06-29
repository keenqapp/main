import { useState } from 'preact/hooks'
import { useStore } from '@nanostores/preact'
import axios from 'axios'
import { atom } from 'nanostores'

import useAsyncEffect from '@/hooks/useAsyncEffect'
import { gql, useMutation } from '@apollo/client'


interface LocalityInfo {
	LikelyLand: boolean
	administrative: Array<any>
	informative: Array<any>
}

// Define the main interface using the properties from the provided object
export interface Position {
	city: string
	continent: string
	continentCode: string
	countryCode: string
	countryName: string
	latitude: number
	locality: string
	localityInfo: LocalityInfo
	localityLanguageRequested: string
	longitude: number
	lookupSource: string
	plusCode: string
	postcode: string
	principalSubdivision: string
	principalSubdivisionCode: string
}

const $permission= atom<PermissionState|null>(null)
const $status = atom<'pending'|'success'|'error'>('pending')
const $location = atom<Position|null>(null)

function getCurrentPositionFromUser(): Promise<GeolocationPosition> {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	})
}

async function getCurrentPositionFromRequest(): Promise<GeolocationPosition> {
	const result = (await axios.get('https://europe-west3-keenqapp.cloudfunctions.net/getgeo')).data
	const [latitude, longitude] = result.headers['x-appengine-citylatlong'].split(',')
	return {
		coords: {
			latitude,
			longitude
		}
	} as any
}

async function getCurrentPosition(): Promise<GeolocationPosition> {
	try {
		return await getCurrentPositionFromUser()
	}
	catch(e) {
		return await getCurrentPositionFromRequest()
	}
}

async function getPositionByCoords({ coords: { latitude, longitude } }: GeolocationPosition): Promise<Position> {
	// return (await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?longitude=${longitude}&latitude=${latitude}&localityLanguage=ru`)).data
	return (await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?longitude=${longitude}&latitude=${latitude}`)).data
}

async function getPosition() {
	try {
		const coords = await getCurrentPosition()
		const position = await getPositionByCoords(coords)
		$location.set(position)
		$status.set('success')
	} catch(e: any) {
		if (e?.code === 1) $permission.set('denied')
		$location.set(null)
		$status.set('error')
	}
}

async function requestPermission() {
	const result = await navigator.permissions.query({ name: 'geolocation' })
	$permission.set(result.state)
	result.addEventListener('change', () => {
		$permission.set(result.state)
	})
}

export function usePosition() {
	const permission = useStore($permission)
	const status = useStore($status)
	const location = useStore($location)
	useAsyncEffect(async () => {
		await getPosition()
	}, [])
	return {
		onRequest: requestPermission,
		permission,
		location,
		status
	}
}

const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY
const url = (params: string) => `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`

async function getPredictions(input: string) {
	const params = {
		input,
		types: '(cities)',
		location: '55.753215,37.622504',
		radius: '4000',
		rankby: 'distance'
	}
	const query = (new URLSearchParams(params)).toString()
	return (await axios.get(url(query))).data
}

const cities = gql`
	mutation GetCities($input: String!, $location: String!) {
		getCities(input: $input, location: $location) {
			predictions {
				description
			}
		}
	}
`

export function useCitySearch(input: string) {
	const [predictions, { error } ] = useMutation(cities)

	useAsyncEffect(async () => {
		if (!input) return
		const data = await getPredictions(input)
		console.log('--- location.ts:126 ->  ->', data)
	}, [ input ])

	return {
		cities: []
	}
}
