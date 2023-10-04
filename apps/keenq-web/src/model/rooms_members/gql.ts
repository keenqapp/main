import { gql } from 'urql'

import { IRoomMember } from '@/model/rooms_members'


export const leaveroom = gql`
	mutation LeaveRoom($memberId: String!, $roomId: String!, $deletedAt: timestamptz!) {
		update_rooms_members_by_pk(pk_columns: { roomId: $roomId, memberId: $memberId }, _set: { deletedAt: $deletedAt }) {
			id
		}
	}
`

export const insertjoinroom = gql`
	mutation InsertJoinRoom($object: rooms_members_insert_input!) {
		insert_rooms_members_one(object: $object) {
			id
		}
	}
`

export const updatejoinroom = gql`
	mutation UpdateJoinRoom($memberId: String!, $roomId: String!) {
		update_rooms_members_by_pk(pk_columns: { roomId: $roomId, memberId: $memberId }, _set: { deletedAt: null }) {
			id
		}
	}
`

export const addmembersgql = gql`
	mutation AddMembers($objects: [rooms_members_insert_input!]!) {
		insert_rooms_members(objects: $objects) {
			returning {
				id
			}
		}
	}
`

export const updateroommember = gql`
	mutation UpdateRoomMember($roomId: String!, $memberId: String!, $role: String!) {
		update_rooms_members_by_pk(pk_columns: { roomId: $roomId, memberId: $memberId }, _set: { role: $role }) {
			id
		}
	}
`

export const removeroommember = gql`
	mutation UpdateRoomMember($roomId: String!, $memberId: String!) {
		delete_rooms_members_by_pk(roomId: $roomId, memberId: $memberId) {
			id
		}
	}
`

export const othermemberinprivategql = gql`
	query OtherMember($rid: String!, $mid: String!) {
		rooms_members(where: { _and: { roomId: { _eq: $rid }, memberId: {_neq: $mid } } }) {
			id
			member {
				id
				name
				images
			}
		}
	}
`

export const privateroomgql = gql<{ rooms_members: IRoomMember[] }, { cid: string, mid: string }>`
	query PrivateRoom($cid: String!, $mid: String!) {
		rooms_members(where: { _and: { memberId: { _eq: $cid }, privateFor: { _eq: $mid } } }) {
			id
			room {
				id
			}
		}
	}
`
