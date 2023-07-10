import { gql } from 'urql'

import { IMember } from '@/model/member/types'


export const matchgql = gql`
	mutation Match($id: String!) {
		match(id: $id) {
			success
			data {
				id
			}
		}
	}
`

export const addmatchgql = gql`
	mutation AddMatch($object: matches_insert_input!) {
		insert_matches_one(object: $object) {
			id
		}
	}
`

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
