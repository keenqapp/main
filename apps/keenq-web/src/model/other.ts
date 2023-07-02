export interface ITag {
	uid: string
	name: string
}

export interface IImage {
	uid: string
	url: string
	name: string
	width: number
	height: number
}

export interface ILocation {
	uid: string
	city: string
	longitude: number
	latitude: number
	timestamp: string
}
