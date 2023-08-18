import { IImage } from '@/model/other'


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
		images: IImage[]
	}
	// @local @computed
	prevAuthorId?: string | null,
	nextAuthorId?: string | null

	content: (IMessageReply | IMessageText | IMessageImage | IMessageFile | IPartnerRequest | IGreeting | IJoined) []
	reactions?: IMessageReaction[]
	reactionsCount?: IMessageReactionCount[]

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
	value: IImage
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
		from: string
		to: string
	}
}

export interface IGreeting {
	type: 'greeting'
	value: {
		text: string
	}
}

export interface IJoined {
	type: 'joined'
	value: {
		memberId: string
	}
}

export interface IMessageMeta {}
