import { useLocation, useParams } from 'react-router-dom'
import { persistentAtom } from '@nanostores/persistent'
import { useStore } from '@nanostores/react'

import { insertactiongql } from '@/model/gql'
import { useCurrentMember } from '@/model/member'
import { insertjoinroom } from '@/model/rooms_members'

import { useInsert } from '@/hooks/gql'
import useAsyncEffect from '@/hooks/useAsyncEffect'
import { json, timeout } from '@/utils/utils'


export const $joinQueue = persistentAtom<Map<string, { id: string, link?: string }>>('$joinQueue', new Map(), json)
// http://192.168.0.2:9001/room/keenq/sss/join

$joinQueue.listen((value) => console.log('--- useShouldJoin.ts:19 ->  -> listen', value))

export default function useShouldJoin() {
	const joinQueue = useStore($joinQueue)
	const { link, id } = useParams()
	const { id: mid } = useCurrentMember()
	const m = useLocation()
	const shouldJoin = m.pathname.includes('/join')
	const [ , insertJoin ] = useInsert(insertjoinroom)
	const [ , insertAction ] = useInsert(insertactiongql)

	async function join({ memberId, roomId, privateFor, link }: { memberId: string, roomId: string, privateFor: string, link?: string }) {
		const { data } = await insertJoin({ memberId, roomId, privateFor })
		if (data) insertAction({ type: 'joinRoom', value: { link, memberId } })
	}

	useAsyncEffect(async () => {
		await timeout(1000)
		if (shouldJoin && id) {
			console.log('--- useShouldJoin.ts:36 ->  -> ', joinQueue, joinQueue.copyAdd(id, { id, link }))
			if (!mid) $joinQueue.set(joinQueue.copyAdd(id, { id, link }))
			else join({ memberId: mid, roomId: id, privateFor: id, link: link })
		}
		if (mid && joinQueue.size) {
			console.log('--- useShouldJoin.ts:41 ->  -> ', 111)
			joinQueue.forEach(async ({ id, link }) => {
				join({ memberId: mid, roomId: id, privateFor: id, link: link })
				$joinQueue.set(joinQueue.copyDelete(id))
			})
		}
	}, [])

	useAsyncEffect(async () => {
		if (mid && joinQueue.size) {
			for await (const item of joinQueue) {
				const [, { id, link }] = item
				const { data } = await insertJoin({ memberId: mid, roomId: id, privateFor: id })
				if (data) insertAction({ type: 'joinRoom', value: { link } })
			}
		}
	}, [ mid ])
}
