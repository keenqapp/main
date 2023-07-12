import { IMember } from '@/model/member'
import { IMessage } from '@/model/message'
import { IImage } from '@/model/other'


export interface IRoom {
	id: string
	name: string
	verified: boolean
	type: 'personal' | 'private' | 'public'  | 'channel'
	image: IImage
	description: string
	lastMessage?: IMessage

	lastMessageId?: number
	unread?: number
	links: string[]
	members: IMember[]
	admins: IMember[]
}
