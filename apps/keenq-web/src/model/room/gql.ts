import { gql } from 'urql'

import { IRoom } from '@/model/room/types'


export const roomsgql = gql<{ rooms: IRoom }>`
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

export const currentroomgql = gql<{ rooms_by_pk: IRoom }>`
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
		}
	}
`

export const updateroomgql = gql`
	mutation UpdateMember($id: String!, $data: rooms_set_input!) {
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


