export interface ITag {
	id: string
	label: string
}

export interface IImage {
	id: string
	url: string
	name: string
	width: number
	height: number
}

export interface ILocation {
	id: string
	city: string
	longitude: number
	latitude: number
	timestamp: string
}
