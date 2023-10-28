import { useEffect, useState } from 'preact/hooks'
import { useParams } from 'react-router-dom'

import { matchgql } from '@/model/match/gql'
import { getPartner, useCurrentMember } from '@/model/member'

import { useQuery } from '@/hooks/gql'
import { useMember } from '@/hooks/useMember'


const options = { requestPolicy: 'cache-and-network', pause: true } as const

export function useMatch() {
	const [ queue, setQueue ] = useState([])
	const { id: pid } = useParams()
	const [ index, setIndex ] = useState(0)
	const { id } = useCurrentMember()
	const [ result, match ] = useQuery(matchgql, { id, offset: queue.length }, options)

	const { data, fetching, error } = result
	const empty = data?.match?.data && data?.match?.data.length === 0

	useEffect(() => {
		if (!data?.match?.data) return
		setQueue(prev => [...prev, ...data.match.data].uniq('id'))
	}, [ result ])

	useEffect(() => {
		if (!data && !pid && !empty && !fetching && !error && id) match()
	}, [ result ])

	const current = queue?.[index]
	const getId = pid || current?.id

	const member = useMember(getId)
	const partner = useMember(getPartner(member)?.id)

	const next = () => {
		if (index < queue?.length - 1) {
			setIndex(index + 1)
			if (index + 1 === queue?.length - 1) match()
		}
	}

	const prev = () => {
		if (index > 0) setIndex(index - 1)
	}

	return {
		member: { ...member, distance: current?.distance },
		partner,
		fetching,
		error,
		empty,
		next,
		prev,
	}
}
