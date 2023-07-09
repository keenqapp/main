import { useEffect, useRef } from 'preact/hooks'
import styled from '@emotion/styled'
import { useParams } from 'react-router-dom'
import { useSubscription } from 'urql'

import List from '@/ui/List'

import RoomMessage from '@/components/Room/RoomMessage'

import { usePipe } from '@/hooks/usePipe'
import type { IMessage } from '@/model/message'
import { messagesgql } from '@/model/message/gql'
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
	flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
`

const RoomMessagesList = styled(List<IMessage>)<{ height: number }>`
	gap: 1rem;
`

function RoomMessages() {
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		ref.current?.scrollTo(0, ref.current.scrollHeight)
	}, [])

	const { id } = useParams()
	const [ result ] = useSubscription( { query: messagesgql, variables: { id } })

	const messages = usePipe(result.data?.messages || [], sort(byDate), reduce(enrich, []))

	return (
		<RoomMessagesContainer data-testid='RoomMessages'>
			<RoomMessagesList
				scrollRef={ref}
				data={messages}
				render={RoomMessage}
			/>
		</RoomMessagesContainer>
	)
}

export default RoomMessages
