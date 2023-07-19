import { gql } from 'urql'

import { IMember } from '@/model/member/types'


export const membergql = gql<{ members_by_pk: IMember }>`
	query Member($id: String!) {
		members_by_pk(id: $id) {
			id
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

export const updatemembergql = gql`
	mutation UpdateMember($id: String!, $data: members_set_input!) {
		update_members_by_pk(pk_columns: { id: $id }, _set: $data) {
			id
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

export const contactsgql = gql`
	query Contacts($id: String!) {
		matches(where: { _and: { authorId: { _eq: $id }, result: { _eq: true } } }) {
			member {
				id
				name
				images
			}
		}
	}
`
