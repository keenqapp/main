import { gql } from 'urql'

import { IMember } from '@/model/member/types'


export const memmberfragment = gql`
	fragment MemberFragment on members {
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
`

export const membergql = gql<{ members_by_pk: IMember }>`
	query Member($id: String!) {
		members_by_pk(id: $id) {
			...MemberFragment
		}
	}
	${memmberfragment}
`

export const currentmembergql = gql<{ members_by_pk: IMember }>`
	query CurrentMember($id: String!) {
		members_by_pk(id: $id) {
			...MemberFragment
		}
	}
	${memmberfragment}
`

export const membersgql = gql<{ members: IMember[] }>`
	query Members($ids: [String!]!) {
		members(where: { id: { _in: $ids } }) {
			...MemberFragment
		}
	}
	${memmberfragment}
`

export const updatemembergql = gql`
	mutation UpdateMember($id: String!, $data: members_set_input!) {
		update_members_by_pk(pk_columns: { id: $id }, _set: $data) {
			...MemberFragment
		}
	}
	${memmberfragment}
`

export const contactsgql = gql`
	query Contacts($id: String!) {
		matches(where: { _and: { authorId: { _eq: $id }, result: { _eq: true } } }) {
			member {
				id
				name
				images
			}
		}
	}
`
