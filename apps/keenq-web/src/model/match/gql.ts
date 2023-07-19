import { gql } from 'urql'


export const matchgql = gql`
	query Match($id: String!) {
		match(id: $id) {
			success
			data {
				id
				reason
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

export const updatematchgql = gql`
	mutation UpdateMatch($authodId: String!, $memberId: String!, $data: matches_set_input!) {
		update_matches_by_pk(pk_columns: { authorId: $authodId, memberId: $memberId}, _set: $data) {
			id
		}
	}
`
