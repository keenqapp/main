import { IMember } from '@/model/member'


export interface IMessage {
	id: string
	roomId: string
	type: 'system' | 'personal' | 'other'

	// Dates
	date: string
	// @local @computed
	prevDate?: string | null
	nextDate?: string | null

	// Authors
	authorId: string
	author: {
		name: string
		image: string
	}
	// @local @computed
	prevAuthorId?: string | null,
	nextAuthorId?: string | null

	content: (IMessageReply | IMessageText | IMessageImage | IMessageFile | IPartnerRequest) []
	reactions: IMessageReaction[]
	reactionsCount: IMessageReactionCount[]

	meta?: IMessageMeta
}

export interface IMessageReaction {
	id: string
	emoji: string
	from: string
}

export interface IMessageReactionCount {
	id: string
	emoji: string
	count: number
}

export interface IMessageText {
	type: 'text'
	value: {
		text: string
	}
}

export interface IMessageImage {
	type: 'image'
	value: {
		id: string
		url: string
		width: number
		height: number
	}
}

export interface IMessageFile {
	type: 'file'
	value: {
		id: string
		url: string
	}
}

export interface IMessageReply {
	type: 'reply'
	value: IMessage
}

export interface IPartnerRequest {
	type: 'partnerRequest'
	value: {
		fromId: string
		from: IMember
	}
}

export interface IMessageMeta {}
