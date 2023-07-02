import { gql } from 'urql'


export const currentgql = gql`
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

export const addimagegql = gql`
	mutation UpdateMember($uid: String!, $data: members_append_input!) {
		update_members_by_pk(pk_columns: { uid: $uid }, _append: $data) {
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
