export interface ITag {
	id: string
	label: string
	locale: 'ru-RU' | 'en-US'
	type: string[]
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

export interface ILink {
	id: string
	entityId: string
	type: string
	url: string
	authorId: string
}
