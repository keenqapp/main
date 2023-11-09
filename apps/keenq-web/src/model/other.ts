export interface ITag {
	id: string
	label: string
	locale: 'ru-RU' | 'en-US'
}

export interface IImage {
	id: string
	url: string
	width: number
	height: number
	date: string
	authorId?: string
}

export interface ILocation {
	id: string
	city: string
	longitude: number
	latitude: number
	timestamp: string
}
