import { useEffect, useRef, useState } from 'preact/hooks'
import styled from '@emotion/styled'
import { useParams } from 'react-router-dom'
import { useSubscription } from 'urql'

import type { IMessage } from '@/model/message'
import { messagesgql } from '@/model/message/gql'

import List from '@/ui/List'

import { $scroll } from '@/components/Room/RoomInput/state'
import RoomMessage from '@/components/Room/RoomMessage'

import { usePipe } from '@/hooks/usePipe'
import { reduce, sort } from '@/utils/utils'


function byDate(a: IMessage, b: IMessage) {
	return new Date(a.date) >= new Date(b.date) ? 1 : -1
}
function enrich(acc: IMessage[], message: IMessage, index: number, data: IMessage[]) {
	const prev = data[index - 1]
	const next = data[index + 1]
	if (!prev && !next) {
		acc.push(message)
		return acc
	}
	acc.push({
		...message,
		nextAuthorId: next?.authorId || null,
		nextDate: next?.date || null,
		prevAuthorId: prev?.authorId || null,
		prevDate: prev?.date || null
	})
	return acc
}

const RoomMessagesContainer = styled.div`
	flex: 2 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
`

const RoomMessagesList = styled(List<IMessage>)<{ height: number }>`
	gap: 0.1rem;
`

function RoomMessages() {
	const [ loaded, setLoaded ] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	const { id } = useParams()
	const [ result ] = useSubscription( { query: messagesgql, variables: { id } })

	useEffect(() => {
		if (result.data && !loaded) {
			setLoaded(true)
			ref.current?.scrollTo(0, ref.current.scrollHeight)
			$scroll.set(ref.current)
		}
	}, [ result.data ])

	const messages = usePipe(result.data?.messages || [], sort(byDate), reduce(enrich, []))

	return (
		<RoomMessagesContainer data-testid='RoomMessages'>
			<RoomMessagesList
				name='RoomMessages'
				scrollRef={ref}
				data={messages}
				render={RoomMessage}
			/>
		</RoomMessagesContainer>
	)
}

export default RoomMessages
