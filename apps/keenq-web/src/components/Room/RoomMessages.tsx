import { useMemo } from 'preact/hooks'
import styled from '@emotion/styled'

import List from '@/ui/List'

import RoomMessage from '@/components/Room/RoomMessage'

import { messages as mock } from './messages.mock'
import type { IMessage } from '@/types/messages'
import { pipe, reduce, sort } from '@/utils/utils'


function byDate(a: IMessage, b: IMessage) {
	return new Date(a.date) >= new Date(b.date) ? 1 : -1
}
function addPrevDate(acc: IMessage[], message: IMessage, index: number, data: IMessage[]) {
	const prev = data[index - 1]
	const next = data[index + 1]
	if (!prev && !next) {
		acc.push(message)
		return acc
	}
	acc.push({
		...message,
		nextAuthorUid: next?.authorUid || null,
		nextDate: next?.date || null,
		prevAuthorUid: prev?.authorUid || null,
		prevDate: prev?.date || null
	})
	return acc
}

const RoomMessagesList = styled(List<IMessage>)`
	padding-top: 1rem;
  height: calc(100vh - var(--vertical-space) * 4 - 1rem);
`

function RoomMessages() {
	const data = mock
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const messages = useMemo<IMessage[]>(() => pipe(sort(byDate), reduce(addPrevDate, []))(data), [data])

	return (
		<div data-testid='RoomMessages'>
			<RoomMessagesList
				data={messages}
				renderItem={RoomMessage}
			/>
		</div>
	)
}

export default RoomMessages
