import { gql } from 'urql'

import { IMessage } from '@/model/message/types'


export const messagesgql = gql<{ messages: IMessage }>`
	subscription Messages($id: String!) {
		messages(where: { roomId: { _eq: $id } }) {
			id
			type
			date
			roomId
			authorId
			content
			reactions
			reactionsCount
		}
	}
`
