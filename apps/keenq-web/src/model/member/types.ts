import { IImage, ILocation, ITag } from '@/model/other'


export interface IMember {
	id: string
	name: string
	description: string
	gender: 'male' | 'female' | 'non-binary'
	sexuality: 'hetero' | 'homo' | 'flexible'
	location: ILocation
	tags: ITag[]
	images: IImage[]
	linked?: IMemberPartner[]
	visible?: string
	done?: boolean
	isTester?: boolean

	// Not implemented
	prefs?: IMemberPrefs
	meta?: IMemberMeta
}

export interface IMemberPartner {
	type: 'partner'
	value: IMember
}

export interface IMemberMeta {}

export interface IMemberPrefs {}
