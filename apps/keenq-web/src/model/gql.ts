import { gql } from 'urql'


export const idgql = gql<{ id: { data: { id: string } } }>`
	query GetId {
		id {
			success
			data {
				id
			}
		}
	}
`
