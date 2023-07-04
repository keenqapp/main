import { IMember } from '@/model/member'


export interface IRoom {
	uid: string
	name: string
	verified: boolean
	type: 'personal' | 'private' | 'public'  | 'channel'
	image: string
	description: string

	last?: string
	unread?: number
	links: string[]
	members: IMember[]
	admins: IMember[]
}
