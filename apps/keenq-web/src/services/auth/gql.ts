import { gql } from 'urql'


export const sendgql = gql`
	mutation Send($phone: String!) {
		send(phone: $phone) {
			success
			data {
				result
				reason
			}
		}
	}
`

export const verifycodegql = gql`
	mutation Verify($phone: String!, $code: String!) {
		verify(phone: $phone, code: $code) {
			data {
				accessToken
				id
				reason
			}
			success
		}
	}
`

export const checktokengql = gql`
	mutation Check($phone: String!, $token: String!) {
		check(phone: $phone, token: $token) {
			data {
				accessToken
				id
				reason
			}
			success
		}
	}
`
