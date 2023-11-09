import { useEffect } from 'react'
import { persistentAtom } from '@nanostores/persistent'
import { useStore } from '@nanostores/react'
import axios from 'axios'
import { atom } from 'nanostores'
import { gql } from 'urql'

import { useTranslate } from '@/services/translate'

import { useQuery } from '@/hooks/gql'
import useAsyncEffect from '@/hooks/useAsyncEffect'
import { useDebounceEffect } from '@/hooks/useDebounceEffect'
import { json } from '@/utils/utils'


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

export interface ICity {
	description: string
	structured_formatting: {
		main_text: string
		secondary_text: string
	}
}

export interface ExtendedGeolocationPosition extends GeolocationPosition {
	isLoading: boolean
}

const $permission= atom<PermissionState|null>(null)
const $status = atom<'pending'|'success'|'error'>('pending')
const $position = atom<Position|null>(null)
const $coords = atom<GeolocationPosition|null>(null)
export const $shouldRequest = persistentAtom('$position:shouldRequest', false, json)

function coordsToString(position: GeolocationPosition) {
	if (!position) return ''
	const { coords: { latitude, longitude } } = position
	return `${latitude},${longitude}`
}

function getCurrentPositionFromUser(): Promise<GeolocationPosition> {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	})
}

async function getCurrentPositionFromRequest(): Promise<GeolocationPosition> {
	const result = (await axios.get('https://europe-west3-keenqapp.cloudfunctions.net/getgeo')).data
	const location = result.headers['x-appengine-citylatlong']
	const [latitude, longitude] = location.split(',')
	return {
		coords: {
			latitude,
			longitude
		}
	} as any
}

async function getCurrentPosition(): Promise<GeolocationPosition> {
	try {
		const { coords } = await getCurrentPositionFromUser()
		$coords.set({ coords } as any)
		return { coords } as any
	}
	catch(e) {
		const coords = await getCurrentPositionFromRequest()
		$coords.set(coords)
		return coords
	}
}

async function getPositionByCoords({ coords: { latitude, longitude } }: GeolocationPosition): Promise<Position> {
	return (await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?longitude=${longitude}&latitude=${latitude}`)).data
}

let timer: any
async function getPosition() {
	try {
		if (timer) clearTimeout(timer)
		timer = setTimeout(async () => {
			const coords = await getCurrentPosition()
			const position = await getPositionByCoords(coords)
			$position.set(position)
			$status.set('success')
		}, 2000)
	}
	catch(e: any) {
		if (timer) clearTimeout(timer)
		timer = setTimeout(() => {
			if (e?.code === 1) $permission.set('denied')
			$position.set(null)
			$status.set('error')
		}, 2000)
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
	const coords = useStore($coords)
	const permission = useStore($permission)
	const status = useStore($status)
	const position = useStore($position)
	const shouldRequest = useStore($shouldRequest)

	useEffect(() => {
		if (!permission && shouldRequest) requestPermission()
	}, [ permission, shouldRequest ])

	useAsyncEffect(async () => {
		if (permission === 'granted') await getPosition()
	}, [ permission ])

	const getPointAndLocation = () => {
		if (!position) return {}
		return {
			point: {
				type: 'Point',
				coordinates: [ position.longitude, position.latitude ]
			},
			location: {
				id: position.plusCode,
				city: position.city,
				longitude: position.longitude,
				latitude: position.latitude,
				timestamp: new Date().toISOString()
			}
		}
	}

	return {
		onRequest: requestPermission,
		getPointAndLocation,
		coords,
		permission,
		position,
		location: coordsToString(coords!),
		status
	}
}

const cities = gql`
	query GetCities($input: String!, $language: String!, $location: String) {
		cities(input: $input, language: $language, location: $location) {
			data
		}
	}
`

export function useCitySearch(input = '') {
	const { locale } = useTranslate()
	const { coords, location } = usePosition()
	const [ result, get ] = useQuery(cities, { input, location, language: locale })

	useDebounceEffect(async () => {
		if (coords) getPosition()
		if (input) get()
	}, [ input, coords ])

	return { fetching: result.fetching, data: result.data?.cities?.data || [] }
}
