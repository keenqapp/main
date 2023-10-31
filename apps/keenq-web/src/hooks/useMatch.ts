import { useEffect, useState } from 'preact/hooks'
import { useParams } from 'react-router-dom'
import { useMutation } from 'urql'

import { matchedgql, matchgql } from '@/model/match/gql'
import { getPartner, useCurrentMember } from '@/model/member'
import { IImage } from '@/model/other'

import { useQuery } from '@/hooks/gql'
import { useMember } from '@/hooks/useMember'


const options = { requestPolicy: 'cache-and-network', pause: true } as const

interface IQueueItem {
	id: string
	distance: number
	images: IImage
}

export function useMatch() {
	const [ queue, setQueue ] = useState<IQueueItem[]>([])
	const [ empty, setEmpty ] = useState(false)
	const { id: pid } = useParams()
	const [ index, setIndex ] = useState(0)
	const { id } = useCurrentMember()
	const [ result, match ] = useQuery(matchgql, { id, offset: queue.length }, options)
	const [ , _matched ] = useMutation(matchedgql)

	const { data, fetching, error } = result

	useEffect(() => {
		if (data?.match?.data !== true || (data?.match?.data && data?.match?.data.length === 0)) {
			setEmpty(true)
		}
		else setQueue(prev => [...prev, ...data.match.data].uniq('id'))
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

	const matched = async (data) => {
		const r = await _matched(data)
		return r
	}

	return {
		member: { ...member, distance: current?.distance },
		matched,
		partner,
		fetching,
		error,
		empty,
		next,
		prev,
	}
}
