
export interface IMessage {
	uid: string
	roomUid: string
	text: string

	// Dates
	date: string
	prevDate?: string | null
	nextDate?: string | null

	// Authors
	authorUid: string
	author: {
		name: string
		image: string
	}
	prevAuthorUid?: string | null,
	nextAuthorUid?: string | null

	// Attachments
	attachmentsUids: string[]
	attachments: [
		{
			uid: string
			type: string
			url: string
			width?: number
			height?: number
		}
	]
}
