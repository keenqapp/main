import { gql } from 'urql'

// export const matchfragment = gql`
// 	fragment MatchFragment on matches {
// 		id
// 		distance
// 		images
// 		match_type
// 	}
// `

export const matchgql = gql`
	query Match($id: String!, $offset: Int, $limit: Int) {
		match(id: $id, offset: $offset, limit: $limit) {
			id
			success
			total
			data {
				id
				distance
				images
				match_type
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
	mutation UpdateMatch($authorId: String!, $memberId: String!, $data: matches_set_input!) {
		update_matches_by_pk(pk_columns: { authorId: $authorId, memberId: $memberId}, _set: $data) {
			id
		}
	}
`

export const matchedgql = gql`
	mutation Matched($authorId: String!, $memberId: String!, $type: String!) {
		matched(authorId: $authorId, memberId: $memberId, type: $type) {
			id
			success
			data {
				reason
				result
			}
		}
	}
`
