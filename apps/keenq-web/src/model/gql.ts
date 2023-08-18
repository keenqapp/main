import { gql } from 'urql'


export const getidgql = gql<{ getid: { data: { id: string } } }>`
	query GetId {
		getid {
			success
			data {
				id
			}
		}
	}
`
