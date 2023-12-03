import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useStore } from '@nanostores/react'
import { atom } from 'nanostores'
import { useMutation } from 'urql'

import { addmatchgql, matchedgql, matchgql, updatematchgql } from '@/model/match/gql'
import { getPartner, useCurrentMember } from '@/model/member'
import { IImage } from '@/model/other'

import { useInsert, useQuery } from '@/hooks/gql'
import { useMember } from '@/hooks/useMember'


const options = {
	requestPolicy: 'network-only',
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
const $empty = atom<boolean>(false)
const $force = atom<boolean>(false)
const $index = atom<number>(0)

$queue.subscribe((value) => {
	$empty.set(value.length === 0)
})

export function useMatch() {
	const navigate = useNavigate()
	const { id: pid } = useParams()

	const queue = useStore($queue)
	const empty = useStore($empty)
	const force = useStore($force)
	const index = useStore($index)

	const { id } = useCurrentMember()
	const [ result, match ] = useQuery(matchgql, { id, offset: queue.length, limit: 100 }, options)
	const [ , _matched ] = useMutation(matchedgql)
	const [ , update ] = useMutation(updatematchgql)
	const [ , add ] = useInsert(addmatchgql)

	const { data, fetching, error } = result

	useEffect(() => {
		if (data?.match?.data && data?.match?.data.length === 0 && queue.length === 0) return $empty.set(true)
		if (data?.match?.success) return $queue.set([...queue, ...data.match.data].uniq('id'))
	}, [ result ])

	useEffect(() => {
		console.log('useMatch.ts --->  ---> 61: ', 555)
		match()
	}, [])

	useEffect(() => {
		if (!data && !empty && !fetching && !error && id) {
			match()
		}
	}, [ result ])

	useEffect(() => {
		const max = queue?.length - 1
		if (index > max) {
			$index.set(max > -1 ? max : 0)
		}
	}, [ index ])

	const current = queue?.[index]
	const mid = pid || current?.id

	const member = useMember(mid)
	const partner = useMember(getPartner(member)?.id)

	useEffect(() => {
		if (id && mid && !fetching && !error) {
			add({ authorId: id, memberId: mid, type: 'seen' })
		}
	}, [ mid, fetching, error, id ])

	const next = () => {
		if (index + 1 <= queue?.length - 1) {
			$index.set(index + 1)
			if (index + 1 === queue?.length - 1) {
				match()
			}
		}
		else {
			console.log('useMatch.ts ---> next ---> 99: ', 999)
			$empty.set(true)
			$force.set(true)
		}
	}

	const prev = () => {
		if (index > 0) $index.set(index - 1)
	}

	const matched = async (data: any) => {
		return await _matched(data)
	}

	const reset = () => {
		$index.set(0)
		$empty.set(false)
		$force.set(false)
	}

	const yes = async () => {
		update({ authorId: id, memberId: mid, data: { type: 'yes' } })
		matched({ authorId: id, memberId: mid, type: 'yes' })
		if (pid) navigate('/match')
		$queue.set(queue.filter((item) => item.id !== mid))
	}

	const no = async () => {
		update({ authorId: id, memberId: mid, data: { type: 'no' } })
		if (pid) navigate('/match')
		$queue.set(queue.filter((item) => item.id !== mid))
	}

	const isEmpty = (!pid && empty) || (!pid && error && queue?.length === 0)

	console.log('useMatch.ts ---> useMatch ---> 133: ', queue)

	return {
		member: { ...member, distance: current?.distance },
		matched,
		partner,
		fetching,
		error,
		empty: isEmpty,
		force,
		index,
		queue,
		next,
		prev,
		reset,
		yes,
		no
	}
}
