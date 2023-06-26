import { useState } from 'preact/hooks'
import axios from 'axios'

import useAsyncEffect from '@/hooks/useAsyncEffect'

// async function handlePermission() {
// 	const result = await navigator.permissions.query({ name: 'geolocation' })
//
//
// 	.then((result) => {
// 		if (result.state === 'granted') {
//
// 		} else if (result.state === 'prompt') {
//
// 		} else if (result.state === 'denied') {
//
// 		}
// 		result.addEventListener('change', () => {
//
// 		})
// 	})
// }

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

function getCurrentPosition(): Promise<GeolocationPosition> {
	return new Promise((resolve, reject) => {
		navigator.geolocation.getCurrentPosition(resolve, reject)
	})
}

async function getPositionByCoords({ coords: { latitude, longitude } }: GeolocationPosition) {
	return (await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?longitude=${longitude}&latitude=${latitude}&localityLanguage=ru`)).data
}

async function getPosition(callback: (position: Position|null) => void, setStatus: (status: 'pending'|'success'|'error') => void) {
	try {
		const coords = await getCurrentPosition()
		const position = await getPositionByCoords(coords)
		callback(position)
		setStatus('success')
	} catch(e) {
		callback(null)
		setStatus('error')
	}
}

export function usePosition() {
	const [ status, setStatus ] = useState<'pending'|'success'|'error'>('pending')
	const [ position, setPosition ] = useState<Position|null>(null)
	useAsyncEffect(async () => {
		await getPosition(setPosition, setStatus)
	}, [])
	return { position, status }
}
