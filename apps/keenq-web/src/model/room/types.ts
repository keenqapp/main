import { IMember } from '@/model/member'
import { IImage } from '@/model/other'


export interface IRoom {
	id: string
	name: string
	verified: boolean
	type: 'personal' | 'private' | 'public'  | 'channel'
	image: IImage
	description: string

	last?: string
	unread?: number
	links: string[]
	members: IMember[]
	admins: IMember[]
}
