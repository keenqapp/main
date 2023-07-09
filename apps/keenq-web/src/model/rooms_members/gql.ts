import { gql } from 'urql'


export const leaveroom = gql`
	mutation LeaveRoom($memberId: String!, $roomId: String!) {
		delete_rooms_members_by_pk(memberId: $memberId, roomId: $roomId) {
			id
		}
	}
`

export const joinroom = gql`
	mutation JoinRoom($object: rooms_members_insert_input!) {
		insert_rooms_members_one(object: $object) {
			id
		}
	}
`
