import md5 from 'md5'
import { gql } from 'urql'

import client from '@/providers/urql'


function _log(provider: any, value: any) {
	provider.log(value)
}

const loggql = gql`
	mutation InsertAction($object: actions_insert_input!) {
		insert_actions_one(object: $object) {
			id
		}
	}
`
const graphqlLogProvider = {
	log: async (object: any) => {
		try {
			await client.mutation(loggql, { object })
		}
		catch(e) {
			console.error('--- log.ts:24 -> log -> ', e)
		}
	}
}

export type LogType = 'joinRoom' | 'register' | 'test'

export function log(type: LogType, value: any) {
	const provider = graphqlLogProvider
	const hash = md5(JSON.stringify(value))
	_log(provider, { type, value, hash })
}
