import { gql } from 'urql'

import { IRoom } from '@/model/room/types'


export const roomsgql = gql<{ rooms: IRoom }>`
	query Rooms {
		rooms {
			uid
			name
			image
			description
			type
			verified
		}
	}
`

export const updategql = gql`
	mutation UpdateMember($uid: String!, $data: rooms_set_input!) {
		update_rooms_by_pk(pk_columns: { uid: $uid }, _set: $data) {
			uid
			name
			image
			description
			type
			verified
		}
	}
`
