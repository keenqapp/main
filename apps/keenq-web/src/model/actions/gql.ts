import { gql } from 'urql'


// const linkfragment = gql`
// 	fragment LinkFragment on links {
// 		__typename
// 		id
// 		entityId
// 		type
// 		url
// 		authorId
// 	}
// `

// export const linksgql = gql<{ links: ILink[] }>`
// 	query Links($where: links_bool_exp!) {
// 		links(where: $where) {
// 			...LinkFragment
// 		}
// 	}
// 	${linkfragment}
// `

// export const insertlinksgql = gql<{ links: ILink[] }>`
// 	mutation InsertLink($object: links_insert_input!) {
// 		insert_links_one(object: $object) {
// 			...LinkFragment
// 		}
// 	}
// 	${linkfragment}
// `
//
// export const removelinksgql = gql<{ links: ILink[] }>`
// 	mutation RemoveLink($id: uuid!) {
// 		delete_links_by_pk(id: $id) {
// 			...LinkFragment
// 		}
// 	}
// 	${linkfragment}
// `
//
// export const joinedbylinkgql = gql<{ links_aggregate: { aggregate: { count: number  } } }>`
// 	query JoinedByLink($url: String!) {
// 		links_aggregate(where: { url: { _eq: $url } }) {
// 			aggregate {
// 				count
// 			}
// 		}
// 	}
// `

export const joinedbylinkgql = gql<{ actions_aggregate: { aggregate: { count: number  } } }>`
	query JoinedByLink($value: jsonb!) {
		actions_aggregate(where: { type: { _eq: "joinRoom" }, value: { _contains: $value } }) {
			aggregate {
				count
			}
		}
	}
`

export const registredbylinkgql = gql<{ actions_aggregate: { aggregate: { count: number  } } }>`
	query JoinedByLink($value: jsonb!) {
		actions_aggregate(where: { type: { _eq: "register" }, value: { _contains: $value } }) {
			aggregate {
				count
			}
		}
	}
`

