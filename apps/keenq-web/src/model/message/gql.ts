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
			seen @client
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
	mutation DeleteMessage($id: bigint!) {
		delete_messages_by_pk(id: $id) {
			id
		}
	}
`

export const messagegql = gql`
	query Message($id: bigint!) {
		messages_by_pk(id: $id) {
			id
			content
			date
			author {
				id
				name
				images
			}
		}
	}
`

export const updatemessagegql = gql`
	mutation UpdateMessage($id: bigint!, $data: messages_set_input!) {
		update_messages_by_pk(pk_columns: { id: $id }, _set: $data) {
			id
		}
	}
`

export const updatereactiongql = gql`
	mutation UpdateReaction($id: bigint!, $data: messages_set_input!) {
		update_messages_by_pk(pk_columns: { id: $id }, _set: $data) {
			id
		}
	}
`

export const deleteallmsgsgql = gql`
	mutation DeleteAllMsgs($roomId: String!, $authorId: String!) {
		delete_messages(where: { roomId: { _eq: $roomId }, authorId: { _eq: $authorId } }) {
			affected_rows
		}
	}
`
