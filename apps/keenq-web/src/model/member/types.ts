import { IImage, ILocation, ITag } from '@/model/other'


export interface IMember {
	uid: string
	name: string
	description: string
	gender: string
	sexuality: string
	location: ILocation
	tags: ITag[]
	image: IImage
	images?: IImage[]
	linked?: (IMemberPartner)[]
	setupDone?: boolean

	prefs?: IMemberPrefs
	meta?: IMemberMeta
}

export interface IMemberPartner {
	type: 'partner'
	value: IMember
}

export interface IMemberMeta {}

export interface IMemberPrefs {}
