import { useEffect, useState } from 'preact/hooks'
import { useParams } from 'react-router-dom'

import { matchgql } from '@/model/match/gql'
import { getPartner, useCurrentMember } from '@/model/member'

import { useQuery } from '@/hooks/gql'
import { useMember } from '@/hooks/useMember'


const options = { requestPolicy: 'cache-and-network', pause: true } as const

export function useMatch() {
	const { id: pid } = useParams()
	const [ index, setIndex ] = useState(0)
	const { id } = useCurrentMember()
	const [ result, match ] = useQuery(matchgql, { id }, options)
	//
	const { data, fetching, error } = result
	const queue = data?.match?.data
	const empty = queue && queue.length === 0

	useEffect(() => {
		if (!data && !pid && !empty && !fetching && !error && id) match()
	}, [ result ])

	const current = queue?.[index]
	const getId = pid || current?.id

	const member = useMember(getId)
	const partner = useMember(getPartner(member)?.id)

	return {
		member: { ...member, distance: current?.distance },
		partner,
		fetching,
		error,
		empty,
		next: () => { index < queue?.length - 1 && setIndex(index + 1) },
		prev: () => { index > 0 && setIndex(index - 1) },
	}
}
