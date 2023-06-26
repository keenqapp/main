import { IMember } from '@/model/member'

export interface IMessage {
	uid: string
	roomUid: string
	type: 'system' | 'personal' | 'other'

	// Dates
	date: string
	// @local @computed
	prevDate?: string | null
	nextDate?: string | null

	// Authors
	authorUid: string
	author: {
		name: string
		image: string
	}
	// @local @computed
	prevAuthorUid?: string | null,
	nextAuthorUid?: string | null

	content: (IMessageReply | IMessageText | IMessageImage | IMessageFile | IPartnerRequest) []
	reactions: IMessageReaction[]
	reactionsCount: IMessageReactionCount[]

	meta?: IMessageMeta
}

export interface IMessageReaction {
	uid: string
	emoji: string
	from: string
}

export interface IMessageReactionCount {
	uid: string
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
		uid: string
		url: string
		width: number
		height: number
	}
}

export interface IMessageFile {
	type: 'file'
	value: {
		uid: string
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
		fromUid: string
		from: IMember
	}
}

export interface IMessageMeta {}
