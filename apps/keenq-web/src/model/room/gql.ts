import { gql } from 'urql'

import { IRoom } from '@/model/room/types'
import { IRoomMember } from '@/model/rooms_members'


export const roomfragment = gql`
	fragment RoomFragment on rooms {
		id
		type
		name
		description
		image
		verified
		createdAt
		updatedAt
		lastMessageId
		deletedAt
		lastMessage {
			id
			content
		}
	}
`

export const roomsgql = gql<{ rooms: IRoom[] }>`
	query Rooms {
		rooms(order_by: { updatedAt: desc_nulls_last }) {
			...RoomFragment
		}
	}
	${roomfragment}
`

export const getroomsgql = gql<{ rooms: IRoom[] }>`
	query Rooms($ids: [String!]!) {
		rooms(where: { id: { _in: $ids }}) {
			...RoomFragment
		}
	}
	${roomfragment}
`

export const roomgql = gql<{ rooms_by_pk: IRoom }>`
	query Room($id: String!) {
		rooms_by_pk(id: $id) {
			...RoomFragment
		}
	}
	${roomfragment}
`

interface ICurrentroomgql {
	rooms_by_pk: IRoom
	rooms_members_excluded_aggregate: { aggregate: { count: number } }
	rooms_members: IRoomMember[]
	rooms_members_excluded: IRoomMember[]
	rooms_admins: IRoomMember[]
}

export const currentroomgql = gql<ICurrentroomgql>`
	query CurrentRoom($id: String!) {
		rooms_by_pk(id: $id) {
			...RoomFragment
		}
		rooms_members(where: { roomId: { _eq: $id } }) {
			memberId
			role
			deletedAt
		}
		rooms_members_excluded(where: { roomId: { _eq: $id } }) {
			memberId
		}
		rooms_admins(where: { roomId: { _eq: $id } }) {
			memberId
			role
		}
	}
	${roomfragment}
`

export const updateroomgql = gql`
	mutation UpdateRoom($id: String!, $data: rooms_set_input!) {
		update_rooms_by_pk(pk_columns: { id: $id }, _set: $data) {
			...RoomFragment
		}
	}
	${roomfragment}
`

export const createroomgql = gql`
	mutation CreateRoom($object: rooms_insert_input!) {
		insert_rooms_one(object: $object) {
			...RoomFragment
		}
	}
	${roomfragment}
`

export const removeroomgql = gql`
	mutation RemoveRoom($id: String!) {
		delete_rooms_by_pk(id: $id) {
			...RoomFragment
		}
	}
	${roomfragment}
`
