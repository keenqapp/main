import { useStore } from '@nanostores/preact'
import { useParams } from 'react-router-dom'

import { $id } from '@/services/auth'

import { useQuery } from '@/hooks/gql'
import { $isAdmin, IMember, membergql } from '@/model/member'
import { getRoomById } from '@/model/room'


const context = {
	additionalTypenames: ['members'],
}

export function useCurrentMember() {
	const id = useStore($id)
	const [ { data } ] = useQuery(membergql, { id }, { context })
	const member = data?.members_by_pk
	const { id: rid } = useParams()
	const room = getRoomById(rid!)
	const admin = $isAdmin(id, room)

	return {
		...member,
		isAdmin: admin,
	} as unknown as IMember
}
