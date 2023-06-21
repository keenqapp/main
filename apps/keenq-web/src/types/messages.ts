
export interface IMessage {
	uid: string
	roomUid: string

	// @Deprecated
	text: string

	// Dates
	date: string
	// @Computed
	prevDate?: string | null
	nextDate?: string | null

	// Authors
	authorUid: string
	author: {
		name: string
		image: string
	}
	// @Computed
	prevAuthorUid?: string | null,
	nextAuthorUid?: string | null

	// Attachments
	// @Deprecated
	attachmentsUids: string[]
	attachments: [
		{
			uid: string
			type: string
			url: string
			width?: number
			height?: number
		}
	],

	content: (IMessageReply | IMessageText | IMessageImage | IMessageFile) []
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
