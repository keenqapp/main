import { useEffect, useState } from 'preact/hooks'
import { useStore } from '@nanostores/preact'
import { atom } from 'nanostores'
import { useParams } from 'react-router-dom'
import { useMutation } from 'urql'

import { matchedgql, matchgql } from '@/model/match/gql'
import { getPartner, useCurrentMember } from '@/model/member'
import { IImage } from '@/model/other'

import { useQuery } from '@/hooks/gql'
import { useMember } from '@/hooks/useMember'


const options = {
	requestPolicy: 'cache-and-network',
	pause: true,
	context: {
		additionalTypenames: ['matches']
	},
} as const

interface IQueueItem {
	id: string
	distance: number
	images: IImage
}

const $queue = atom<IQueueItem[]>([])

export function useMatch() {
	const queue = useStore($queue)
	const [ empty, setEmpty ] = useState(false)
	const { id: pid } = useParams()
	const [ index, setIndex ] = useState(0)
	const { id } = useCurrentMember()
	const [ result, match ] = useQuery(matchgql, { id, offset: queue.length }, options)
	const [ , _matched ] = useMutation(matchedgql)

	const { data, fetching, error } = result

	useEffect(() => {
		if (data?.match?.success !== true || (data?.match?.data && data?.match?.data.length === 0)) {
			setEmpty(true)
		}
		else {
			setEmpty(false)
			$queue.set([...queue, ...data.match.data].uniq('id'))
		}
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
		else {
			setEmpty(true)
		}
	}

	const prev = () => {
		if (index > 0) setIndex(index - 1)
	}

	const matched = async (data) => {
		const r = await _matched(data)
		return r
	}

	const reset = () => {
		setEmpty(false)
		setIndex(0)
	}

	return {
		member: { ...member, distance: current?.distance },
		matched,
		partner,
		fetching,
		error,
		empty,
		queue,
		next,
		prev,
		reset
	}
}
