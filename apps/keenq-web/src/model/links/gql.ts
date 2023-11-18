import { gql } from 'urql'

import { ILink } from '@/model/other'


const linkfragment = gql`
	fragment LinkFragment on links {
		__typename
		id
		entityId
		type
		url
		authorId
	}
`

export const linksgql = gql<{ links: ILink[] }>`
	query Links($where: links_bool_exp!) {
		links(where: $where) {
			...LinkFragment
		}
	}
	${linkfragment}
`

export const insertlinksgql = gql<{ links: ILink[] }>`
	mutation InsertLink($object: links_insert_input!) {
		insert_links_one(object: $object) {
			...LinkFragment
		}
	}
	${linkfragment}
`

export const removelinksgql = gql<{ links: ILink[] }>`
	mutation RemoveLink($id: uuid!) {
		delete_links_by_pk(id: $id) {
			...LinkFragment
		}
	}
	${linkfragment}
`
