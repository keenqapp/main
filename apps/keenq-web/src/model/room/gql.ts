import { gql } from 'urql'

import { IRoom } from '@/model/room/types'
import { IRoomMember } from '@/model/rooms_members'


export const roomsgql = gql<{ rooms: IRoom[] }>`
	query Rooms {
		rooms {
			id
			name
			image
			description
			type
			verified
			lastMessage {
				id
				content
			}
		}
	}
`

export const roomgql = gql<{ rooms_by_pk: IRoom }>`
	query Room($id: String!) {
		rooms_by_pk(id: $id) {
			id
			name
			image
			description
			type
			verified
		}
	}
`

interface ICurrentroomgql {
	rooms_by_pk: IRoom
	rooms_members_aggregate: { aggregate: { count: number } }
	rooms_members: IRoomMember[]
	rooms_admins: IRoomMember[]
}

export const currentroomgql = gql<ICurrentroomgql>`
	query CurrentRoom($id: String!) {
		rooms_by_pk(id: $id) {
			id
			name
			image
			description
			type
			verified
		}
		rooms_members_aggregate(where: { roomId: { _eq: $id } }) {
			aggregate {
				count
			}
		}
		rooms_members(where: { roomId: { _eq: $id } }) {
			memberId
		}
		rooms_admins(where: { roomId: { _eq: $id } }) {
			memberId
			role
		}
	}
`

export const updateroomgql = gql`
	mutation UpdateRoom($id: String!, $data: rooms_set_input!) {
		update_rooms_by_pk(pk_columns: { id: $id }, _set: $data) {
			id
			name
			image
			description
			type
			verified
		}
	}
`

export const createroomgql = gql`
	mutation CreateRoom($object: rooms_insert_input!) {
		insert_rooms_one(object: $object) {
			id
		}
	}
`

export const removeroomgql = gql`
	mutation RemoveRoom($id: String!, $data: rooms_set_input!) {
		update_rooms_by_pk(pk_columns: { id: $id }, _set: $data) {
			id
		}
	}
`
