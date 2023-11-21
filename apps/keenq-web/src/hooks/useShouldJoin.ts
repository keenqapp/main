import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { persistentAtom } from '@nanostores/persistent'
import { useStore } from '@nanostores/react'

import { $isReg } from '@/services/auth'

import { insertactiongql } from '@/model/gql'
import { useCurrentMember } from '@/model/member'
import { insertjoinroom } from '@/model/rooms_members'

import { useInsert } from '@/hooks/gql'
import useAsyncEffect from '@/hooks/useAsyncEffect'
import { json, timeout } from '@/utils/utils'


export const $joinQueue = persistentAtom<Map<string, { id: string, url?: string, ts: string }>>('$joinQueue', new Map(), json)
// http://192.168.0.2:9001/room/keenq/sss/join

// $joinQueue.listen((value) => console.log('--- useShouldJoin.ts:19 ->  -> listen', value))

function byTs(a: { ts: string }, b: { ts: string }) {
	return new Date(a.ts).getTime() - new Date(b.ts).getTime()
}

export default function useShouldJoin() {
	const [ loading, setLoading ] = useState(false)
	const joinQueue = useStore($joinQueue)
	const { url, id } = useParams()
	const { id: memberId } = useCurrentMember()
	const m = useLocation()
	const shouldJoin = m.pathname.includes('/join')
	const [ , insertJoin ] = useInsert(insertjoinroom)
	const [ , insertAction ] = useInsert(insertactiongql)

	async function join({ memberId, roomId, privateFor, url, ts }: { memberId: string, roomId: string, privateFor: string, url?: string, ts: string }) {
		setLoading(true)
		const { data } = await insertJoin({ memberId, roomId, privateFor, deletedAt: null })
		if (data) await insertAction({ type: 'joinRoom', value: { url, memberId, ts } })
		if ($isReg.get()) {
			$isReg.set(false)
			insertAction({ type: 'registration', value: { url, memberId, ts } })
		}
		setLoading(false)
	}

	useAsyncEffect(async () => {
		await timeout(1000)
		if (shouldJoin && id) {
			if (!memberId) $joinQueue.set(joinQueue.copyAdd(id, { id, url, ts: new Date().toISOString() }))
			else join({ memberId, roomId: id, privateFor: id, url: url, ts: new Date().toISOString() })
		}
		if (memberId && joinQueue.size) {
			[...joinQueue.values()].sort(byTs).forEach(async ({ id, url, ts }) => {
				join({ memberId, roomId: id, privateFor: id, url, ts })
				$joinQueue.set(joinQueue.copyDelete(id))
			})
		}
	}, [])

	useAsyncEffect(async () => {
		if (memberId && joinQueue.size) {
			for await (const item of joinQueue) {
				const [, { id, url }] = item
				const { data } = await insertJoin({ memberId, roomId: id, privateFor: id })
				if (data) insertAction({ type: 'joinRoom', value: { url,  } })
			}
		}
	}, [ memberId ])

	return loading
}
