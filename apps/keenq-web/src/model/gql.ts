import { gql } from 'urql'


export const insertactiongql = gql<{  }>`
	mutation InsertAction($object: actions_insert_input!) {
		insert_actions_one(object: $object) {
			id
		}
	}
`
