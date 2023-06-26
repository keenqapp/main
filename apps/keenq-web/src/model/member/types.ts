import { IImage } from '@/types/image'


export interface IMember {
	uid: string
	name: string
	image: string
	images?: IImage[]
	linked?: (IMemberPartner)[]

	prefs?: IMemberPrefs
	meta?: IMemberMeta
}

export interface IMemberPartner {
	type: 'partner'
	value: IMember
}

export interface IMemberMeta {}

export interface IMemberPrefs {}
