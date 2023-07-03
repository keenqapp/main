import { gql } from 'urql'


export const currentgql = gql<{ uid: string }>`
	query CurrentMember($uid: String!) {
		members_by_pk(uid: $uid) {
			uid
			name
			description
			image
			images
			sexuality
			gender
			done
			location
			tags
		}
	}
`

export const updategql = gql`
	mutation UpdateMember($uid: String!, $data: members_set_input!) {
		update_members_by_pk(pk_columns: { uid: $uid }, _set: $data) {
			uid
			name
			description
			image
			images
			sexuality
			gender
			done
			location
		}
	}
`
