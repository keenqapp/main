import { gql } from 'urql'

import { IMember } from '@/model/member/types'


export const membergql = gql<{ members_by_pk: IMember }>`
	query Member($uid: String!) {
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
			visible
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
			visible
		}
	}
`
