import { gql } from 'urql'


export const addreportgql = gql`
	mutation AddReport($object: requests_insert_input!) {
		insert_requests_one(object: $object) {
			id
		}
	}
`
