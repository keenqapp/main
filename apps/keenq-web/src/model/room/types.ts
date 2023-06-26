import { IMember } from '@/model/member'


export interface IRoom {
	uid: string
	name: string
	verified: boolean
	type: 'public' | 'private' | 'channel'
	image: string
	description: string
	links: string[]
	members: IMember[]
}
