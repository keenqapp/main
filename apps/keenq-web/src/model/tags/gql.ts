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

export const createtaggql = gql`
	mutation CreateTag($object: tags_insert_input!) {
		insert_tags_one(object: $object) {
			id
			label
		}
	}
`

export const addtaggql = gql`
	mutation AddTag($object: members_tags_insert_input!) {
		insert_members_tags_one(object: $object) {
			id
		}
	}
`

export const removetaggql = gql`
	mutation RemoveTag($member_id:  String!, $tag_id: String!) {
		delete_members_tags(where: { _and: { member_id: { _eq: $member_id }, tag_id: { _eq: $tag_id } } }) {
			affected_rows
		}
	}
`
