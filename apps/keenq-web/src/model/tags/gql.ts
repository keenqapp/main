import { gql } from 'urql'

import { ITag } from '@/model/other'


export const tagsgql = gql<{ tags: ITag[] }>`
	query GetTags {
		tags {
			id
			label
		}
	}
`

export const addtaggql = gql`
	mutation AddTag($object: tags_insert_input!) {
		insert_tags_one(object: $object) {
			id
			label
		}
	}
`
