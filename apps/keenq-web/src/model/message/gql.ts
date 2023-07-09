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
			author {
				id
				name
				images
			}
		}
	}
`

export const insertmessagegql = gql`
	mutation InsertMessage($object: messages_insert_input!) {
		insert_messages_one(object: $object) {
			id
		}
	}
`

export const deletemessagegql = gql`
	mutation DeleteMessage($id: Int!) {
		delete_messages_by_pk(id: $id) {
			id
		}
	}
`

export const messagegql = gql`
	query Message($id: Int!) {
		messages_by_pk(id: $id) {
			id
			content
			date
			author {
				id
				name
			}
		}
	}
`

export const updatemessagegql = gql`
	mutation UpdateMessage($id: Int!, $data: messages_set_input!) {
		update_messages_by_pk(pk_columns: { id: $id }, _set: $data) {
			id
		}
	}
`
