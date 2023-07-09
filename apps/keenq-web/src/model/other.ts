export interface ITag {
	id: string
	label: string
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
