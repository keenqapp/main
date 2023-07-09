import { IImage, ILocation, ITag } from '@/model/other'


export interface IMember {
	id: string
	name: string
	description: string
	gender: string
	sexuality: string
	location: ILocation
	tags: ITag[]
	images?: IImage[]
	linked?: (IMemberPartner)[]
	visible?: boolean
	done?: boolean

	prefs?: IMemberPrefs
	meta?: IMemberMeta
}

export interface IMemberPartner {
	type: 'partner'
	value: IMember
}

export interface IMemberMeta {}

export interface IMemberPrefs {}
