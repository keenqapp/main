import { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { persistentAtom } from '@nanostores/persistent'
import { useStore } from '@nanostores/react'
import { computed } from 'nanostores'

import { log } from '@/services/log'

import { useCurrentMember } from '@/model/member'
import { insertjoinroom } from '@/model/rooms_members'

import { useInsert } from '@/hooks/gql'
import useAsyncEffect from '@/hooks/useAsyncEffect'
import { json, timeout } from '@/utils/utils'


function byTs(a: { ts: string }, b: { ts: string }) {
	return new Date(a.ts).getTime() - new Date(b.ts).getTime()
}
export const $joinQueue = persistentAtom<Map<string, { memberId?: string, url?: string, ts: string, roomId: string }>>('$joinQueue', new Map(), json)
export const $sortedJoinQueue = computed($joinQueue, (joinQueue) => [...joinQueue.values()].sort(byTs))
// http://192.168.0.2:9001/room/keenq/sss/join

// $joinQueue.listen((value) => console.log('--- useShouldJoin.ts:19 ->  -> listen', value))


export default function useShouldJoin() {
	const [ loading, setLoading ] = useState(false)
	const joinQueue = useStore($joinQueue)
	const { url, id: roomId } = useParams()
	const { id: memberId } = useCurrentMember()
	const m = useLocation()
	const shouldJoin = m.pathname.includes('/join')
	const [ , insertJoin ] = useInsert(insertjoinroom)

	async function join({ memberId, roomId, url, ts }: { memberId: string, roomId: string, url?: string, ts: string }) {
		setLoading(true)
		const { data } = await insertJoin({ memberId, roomId, privateFor: roomId, deletedAt: null })
		if (data) log('joinRoom', { roomId, url, memberId, ts })
		setLoading(false)
	}

	useAsyncEffect(async () => {
		await timeout(1000)
		if (shouldJoin && roomId) {
			if (!memberId) $joinQueue.set(joinQueue.copyAdd(roomId, { roomId, url, ts: new Date().toISOString() }))
			else join({ memberId, roomId, url: url, ts: new Date().toISOString() })
		}
		if (memberId && joinQueue.size) {
			console.log('--- useShouldJoin.ts:50 ->  -> ', $sortedJoinQueue.get())
			for await (const { url, ts, roomId } of $sortedJoinQueue.get()) {
				join({ memberId, roomId, url, ts })
				$joinQueue.set(joinQueue.copyDelete(roomId))
				await timeout(10)
			}
		}
	}, [ memberId ])

	return loading
}
